from pathlib import Path
from subprocess import call
from sys import exit
from typing import Sequence

import click
from entrypoint import entrypoint

EXECUTE = "npx"
TAILWIND = "tailwindcss"
INPUT = "-i"
OUTPUT = "-o"
MINIFY = "-m"
WATCH = "-w"

ROOT = Path(__file__).parent

STATIC_NAME = "static"
CSS_NAME = "css"

STATIC = ROOT / STATIC_NAME
CSS = STATIC / CSS_NAME

INPUT_NAME = "input.css"
OUTPUT_NAME = "output.css"

DEFAULT_INPUT = CSS / INPUT_NAME
DEFAULT_OUTPUT = CSS / OUTPUT_NAME

DEFAULT_WATCH = False


def build_command(input: Path, output: Path, watch: bool) -> Sequence[str]:
    arguments = [EXECUTE, TAILWIND, INPUT, input.as_posix(), OUTPUT, output.as_posix(), MINIFY]

    if watch:
        arguments.append(WATCH)

    return arguments


SHELL = False


@entrypoint(__name__)
@click.option("--input", "-i", type=Path, default=DEFAULT_INPUT)
@click.option("--output", "-o", type=Path, default=DEFAULT_OUTPUT)
@click.option("--watch", "-w", is_flag=True, default=DEFAULT_WATCH)
@click.command()
def build(input: Path, output: Path, watch: bool) -> None:
    exit(call(build_command(input, output, watch=watch), cwd=ROOT, shell=SHELL))
