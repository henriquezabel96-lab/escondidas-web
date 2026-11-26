"""Prepara las fotos del sitio: extrae fotogramas reales de los videos,
aplica un ajuste de color suave y genera versiones WebP en varios anchos.

Uso: python3 herramientas/medios.py
Salida: public/img/f/<slug>-<ancho>.webp y public/img/f/manifest.json
"""
import json
import os
import subprocess
import sys

from PIL import Image, ImageEnhance, ImageOps

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SALIDA = os.path.join(RAIZ, 'public', 'img', 'f')
TMP = '/tmp/esc_medios'
UP = '/mnt/user-data/uploads/'
W2 = '/home/claude/esc/web2/img/'
ENT = '/home/claude/esc/entrantes/'
ANCHOS = [480, 800, 1200, 1600, 2000]

V_BUGGY = UP + 'IMG_2723.MOV'      # 1080x1920, caravana y casco rojo
V_AMIGAS = UP + 'IMG_1589_2.mov'   # 4K vertical, amigas y camino verde

# slug: (origen, segundo o None, recorte (x0,y0,x1,y1) relativo o None, ajuste de color)
FUENTES = {
    # Fotogramas reales de excursiones de la agencia
    'buggy-caravana': (V_BUGGY, 26.0, None, True),
    'buggy-polvo': (V_BUGGY, 29.3, None, True),
    'buggy-casco': (V_BUGGY, 59.0, None, True),
    'buggy-manejando': (V_BUGGY, 55.2, None, True),
    'buggy-amigas': (V_AMIGAS, 11.7, None, True),
    'buggy-amigas-2': (V_AMIGAS, 12.6, None, True),
    'buggy-camino': (V_AMIGAS, 16.6, None, True),
    'buggy-volante': (V_AMIGAS, 2.6, None, True),
    # Fotos de lugares (Wikimedia Commons, adjuntadas por el cliente)
    'basilica-higuey': (UP + 'afd8ef01-image.jpg', None, None, False),
    'basilica-aerea': (UP + '531bfa8d-image.jpg', None, None, False),
    'altagracia-cuadro': (UP + '26ed74ef-image.jpg', None, None, False),
    'macao-acantilado': (UP + 'a0026385-image.jpg', None, None, False),
    # Fotos con crédito ya registrado (Wikimedia / cortesía del hotel)
    'saona-playa': (W2 + 'hero.jpg', None, None, False),
    'saona-palmera': (W2 + 'playa-saona.jpg', None, None, False),
    'saona-cocoteros': (W2 + 'islas.jpg', None, None, False),
    'bahia-aguilas': (W2 + 'playas.jpg', None, None, False),
    'salto-limon': (W2 + 'cascadas.jpg', None, None, False),
    'pico-duarte': (W2 + 'montana.jpg', None, None, False),
    'costa-pacifica': (W2 + 'crucero.jpg', None, None, False),
    'lopesan': (W2 + 'lopesan.jpg', None, None, False),
    'hardrock': (W2 + 'hardrock.jpg', None, None, False),
    'zemi': (W2 + 'zemi.jpg', None, None, False),
    'bayahibe': (W2 + 'sunscape.jpg', None, None, False),
    'guatape': ('/home/claude/esc/perfil/guatape.jpg', None, None, False),
    # Flyers de la agencia (nov 2026): recorte de la parte de foto y el flyer completo
    'exc-ballenas': (UP + 'b3581001-image.jpg', None, (0, .345, 1, .612), False),
    'exc-cayo-arena': (UP + 'c5fc5f18-image.jpg', None, (0, .402, 1, .552), False),
    'exc-montecristi': (UP + '1034effe-image.jpg', None, (0, .36, 1, .663), False),
    'exc-el-dorado': (UP + '56426480-image.jpg', None, (0, .371, 1, .66), False),
    'exc-tierra-tropical': (UP + 'c037dbf6-image.jpg', None, (0, .425, 1, .695), False),
    'flyer-ballenas': (UP + 'b3581001-image.jpg', None, None, False),
    # Ofertas de resorts (flyers del mayorista, nov 2026)
    'flyer-tropical-cofresi': (UP + 'eb685f6b-image.png', None, None, False),
    # Nov 2026: fotos que faltaban (Wikimedia Commons e IA de Higgsfield)
    'hardrock-piscina': (ENT + 'hardrock-piscina.jpg', None, None, False),  # Magnus Bråth, CC BY 2.0
    'cueva-taina': (ENT + 'cueva-taina.jpg', None, None, False),            # ilustrativa, Higgsfield
    'casa-tipica': (ENT + 'casa-tipica.jpg', None, None, False),            # ilustrativa, Higgsfield
    'flyer-presidential-suites': (UP + '762c4af1-image.png', None, None, False),
    'flyer-hard-rock': (UP + '96825562-image.png', None, None, False),
    'flyer-ocean-blue-sand': (UP + '9e118303-image.png', None, None, False),
    'flyer-ocean-el-faro': (UP + '869bee26-image.png', None, None, False),
    # Foto limpia de cada hotel para su tarjeta (recorte del flyer, sin textos ni logos)
    'hotel-ocean-blue-sand': (UP + '9e118303-image.png', None, (0, 0.535, 0.585, 0.885), False),
    'hotel-ocean-el-faro': (UP + '869bee26-image.png', None, (0.33, 0.535, 0.91, 0.87), False),
    'hotel-presidential-suites': (UP + '762c4af1-image.png', None, (0.2, 0.128, 0.835, 0.508), False),
    'hotel-tropical-cofresi': (UP + 'eb685f6b-image.png', None, (0.17, 0.132, 0.87, 0.52), False),
    # Nov 2026: fotos reales de la excursión de Macao (Drive del cliente, carpeta "Contenido IG")
    'macao-grupo-buggies': (ENT + 'drive/macao-grupo-video.mp4', 4.5, None, True),
    'basilica-real': (ENT + 'drive/basilica-real.jpg', None, None, False),
    'macao-buggy-saludo': (ENT + 'drive/macao-buggy-saludo.jpg', None, None, False),
    'macao-amigas-paz': (ENT + 'drive/macao-buggy-paz.jpg', None, None, False),
    'macao-amigas-risas': (ENT + 'drive/macao-buggy-risas.jpg', None, None, False),
    'macao-brindis': (ENT + 'drive/macao-grupo-brindis.jpg', None, None, False),
    # Ofertas Viva by Wyndham (flyers del mayorista, nov 2026): flyer completo y recorte limpio
    'flyer-viva-samana': (UP + '0c649e95-image.jpg', None, None, False),
    'flyer-viva-heavens': (UP + 'adb03262-image.jpg', None, None, False),
    'flyer-viva-tangerine': (UP + '49567753-image.jpg', None, None, False),
    'flyer-viva-dominicus': (UP + '7534b0b4-image.jpg', None, None, False),
    'flyer-viva-miches': (UP + 'e7f67085-image.jpg', None, None, False),
    'hotel-viva-samana': (UP + '0c649e95-image.jpg', None, (0, .12, 1, .50), False),
    'hotel-viva-heavens': (UP + 'adb03262-image.jpg', None, (0, .12, 1, .50), False),
    'hotel-viva-tangerine': (UP + '49567753-image.jpg', None, (0, .12, 1, .50), False),
    'hotel-viva-dominicus': (UP + '7534b0b4-image.jpg', None, (0, .12, 1, .50), False),
    'hotel-viva-miches': (UP + 'e7f67085-image.jpg', None, (0, .12, 1, .50), False),
    'flyer-cayo-arena': (UP + 'c5fc5f18-image.jpg', None, None, False),
    'flyer-montecristi': (UP + '1034effe-image.jpg', None, None, False),
    'flyer-el-dorado': (UP + '56426480-image.jpg', None, None, False),
    'flyer-tierra-tropical': (UP + 'c037dbf6-image.jpg', None, None, False),
}


def fotograma(video, seg, destino):
    if os.path.exists(destino):
        return destino
    subprocess.run([
        'ffmpeg', '-y', '-loglevel', 'error', '-ss', str(seg), '-i', video,
        '-frames:v', '1', '-vf', "scale='min(1600,iw)':-2:flags=lanczos", destino
    ], check=True)
    return destino


def ajustar(im):
    """Ajuste suave: algo de contraste y color, sombras frías y luces cálidas."""
    im = ImageEnhance.Contrast(im).enhance(1.06)
    im = ImageEnhance.Color(im).enhance(1.12)
    r, g, b = im.split()
    r = r.point(lambda v: min(255, int(v * 1.02 + 2)))
    b = b.point(lambda v: min(255, int(v * 0.97 + 4)))
    return Image.merge('RGB', (r, g, b))


def color_medio(im):
    p = im.resize((1, 1), Image.LANCZOS).getpixel((0, 0))
    # Oscurece un poco para que el hueco mientras carga no brille
    p = tuple(int(c * 0.82) for c in p)
    return '#%02x%02x%02x' % p


def main():
    os.makedirs(SALIDA, exist_ok=True)
    os.makedirs(TMP, exist_ok=True)
    manifest = {}
    solo = set(sys.argv[1:])
    for slug, (origen, seg, recorte, color) in FUENTES.items():
        if solo and slug not in solo:
            continue
        if seg is not None:
            origen = fotograma(origen, seg, os.path.join(TMP, slug + '.png'))
        im = ImageOps.exif_transpose(Image.open(origen)).convert('RGB')
        if recorte:
            w, h = im.size
            im = im.crop((int(recorte[0] * w), int(recorte[1] * h), int(recorte[2] * w), int(recorte[3] * h)))
        if color:
            im = ajustar(im)
        w, h = im.size
        anchos = [a for a in ANCHOS if a < w] + [min(w, ANCHOS[-1])]
        anchos = sorted(set(anchos))
        for a in anchos:
            alto = round(h * a / w)
            v = im if a == w else im.resize((a, alto), Image.LANCZOS)
            v.save(os.path.join(SALIDA, f'{slug}-{a}.webp'), 'WEBP', quality=74, method=6)
        manifest[slug] = {'w': w, 'h': h, 'anchos': anchos, 'color': color_medio(im)}
        print(slug, w, h, anchos)
    ruta = os.path.join(SALIDA, 'manifest.json')
    if solo and os.path.exists(ruta):
        viejo = json.load(open(ruta))
        viejo.update(manifest)
        manifest = viejo
    json.dump(manifest, open(ruta, 'w'), indent=1, ensure_ascii=False)


if __name__ == '__main__':
    main()
