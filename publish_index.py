#!/usr/bin/env python3

import re
import sys
import os
import shutil


def is_interactive_terminal():
    return hasattr(sys.stdout, 'isatty') and sys.stdout.isatty()


def info(msg):
    if is_interactive_terminal():
        print(f'\033[92m{msg}\033[0m')
    else:
        print(msg)


def write_index_md():
    content = ''
    with open('README.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove docs/ from HTML href and src attributes
    pattern = r'(href|src)=["\']docs/([^"\']+)["\']'
    content = re.sub(pattern, r'\1="\2"', content)
    
    # Remove docs/ from markdown links
    pattern = r'\[([^\]]+)\]\(docs/([^)]+)\)'
    content = re.sub(pattern, r'[\1](\2)', content)

    content = simplify_video_section(content)

    with open('docs/index.md', 'w', encoding='utf-8') as f:
        f.write(content)
    info('docs/index.md written successfully')


def simplify_video_section(content):
    video_pattern = r'## Video introduction\s*\n\s*https://github\.com/lsimons/caseum/assets/47133/890185f5-cc6f-42d5-887b-34939f8070c0\s*\n\s*\(\[watch on YouTube\]\(https://youtu\.be/0s1qPY-W1ew\), \[slides\]\([^)]+\)\)\s*\n'
    replacement = '## Video introduction\n\n[Watch on YouTube](https://youtu.be/0s1qPY-W1ew)\n\n'
    return re.sub(video_pattern, replacement, content, flags=re.MULTILINE)


def copy_extra_docs_files():
    files_to_copy = ['CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE.txt']
    for file in files_to_copy:
        shutil.copy2(file, f'docs/{file}')
        info(f'{file} copied to docs/')


def main():
    
    os.makedirs('docs', exist_ok=True)
    
    write_index_md()
    copy_extra_docs_files()


if __name__ == '__main__':
    main()
