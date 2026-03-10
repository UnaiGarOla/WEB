import os
import sys

def generar():
    # Obtener la ruta donde está el programa
    if getattr(sys, 'frozen', False):
        dir_raiz = os.path.dirname(sys.executable)
    else:
        dir_raiz = os.path.dirname(os.path.abspath(__file__))

    os.chdir(dir_raiz)
    ruta_fotos = os.path.join('media', 'galeria')
    archivo_salida = os.path.join(ruta_fotos, 'lista_fotos.js')
    extensiones = ('.jpg', '.jpeg', '.png', '.webp', '.gif')

    print("--- GENERADOR DE LISTA DE FOTOS ---")
    
    try:
        if not os.path.exists(ruta_fotos):
            print(f"❌ ERROR: No veo la carpeta '{ruta_fotos}'")
            return

        # IMPORTANTE: El nombre de la variable debe ser 'misFotosDelSlider'
        archivos = [f"media/galeria/{a}" for a in os.listdir(ruta_fotos) if a.lower().endswith(extensiones)]
        archivos.sort()

        with open(archivo_salida, 'w', encoding='utf-8') as f:
            # Aquí está el truco: coincidir con el JS
            f.write(f"var misFotosDelSlider = {str(archivos)};")

        print(f"✅ ÉXITO: He leído {len(archivos)} fotos.")
        print(f"📄 Archivo creado en: {archivo_salida}")

    except Exception as e:
        print(f"❌ ERROR: {e}")

if __name__ == "__main__":
    generar()
    print("\n" + "-"*30)
    input("Presiona ENTER para cerrar...")