"""Gera js/samples.js a partir de ../samples/*.mp3. Rode na pasta do site: python tools/build-samples.py"""
import base64

FILES = {'kick': 'kick', 'snare': 'snare', 'hihat': 'hi hat', 'tom1': 'tom 1', 'tom2': 'tom 2', 'floor': 'floor tom', 'crash': 'crash', 'ride': 'ride'}
rows = ',\n'.join(f"  {n}: '{base64.b64encode(open(f'../samples/{f}.mp3', 'rb').read()).decode()}'" for n, f in FILES.items())
head = '/* Gerado por tools/build-samples.py a partir de ../samples/*.mp3. Usado só quando o site é aberto direto do disco (file://). */\n'
open('js/samples.js', 'w', newline='\n', encoding='utf-8').write(f'{head}window.TAMA_SAMPLES = {{\n{rows}\n}};\n')
print('js/samples.js atualizado')
