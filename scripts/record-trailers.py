"""Record 9:16 trailers of each demo in attract (bot) mode. Needs: playwright (chromium), ffmpeg.
Usage: python3 scripts/record-trailers.py  (serves ./public on port 8765 while recording)"""
import asyncio, subprocess, pathlib, shutil, http.server, threading, functools

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
DEMOS = ["sky-hopper", "kart-rush", "star-pop"]
SECONDS = 9

def serve():
    h = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(PUB))
    h.log_message = lambda *a: None
    http.server.ThreadingHTTPServer(("127.0.0.1", 8765), h).serve_forever()

async def main():
    from playwright.async_api import async_playwright
    threading.Thread(target=serve, daemon=True).start()
    out = PUB / "trailers"; out.mkdir(exist_ok=True)
    tmp = ROOT / ".rec"; shutil.rmtree(tmp, ignore_errors=True)
    async with async_playwright() as pw:
        b = await pw.chromium.launch()
        for d in DEMOS:
            ctx = await b.new_context(viewport={"width": 720, "height": 1280}, device_scale_factor=1,
                                      record_video_dir=str(tmp / d), record_video_size={"width": 720, "height": 1280})
            p = await ctx.new_page()
            await p.goto(f"http://127.0.0.1:8765/demos/{d}/?attract=1")
            await p.wait_for_timeout(SECONDS * 1000 + 800)
            await ctx.close()
            webm = next((tmp / d).glob("*.webm"))
            mp4 = out / f"{d}.mp4"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", "0.8", "-i", str(webm), "-t", str(SECONDS),
                            "-vf", "scale=720:1280,fps=30", "-c:v", "libx264", "-preset", "veryfast", "-crf", "27",
                            "-pix_fmt", "yuv420p", "-an", "-movflags", "+faststart", str(mp4)], check=True)
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-ss", "3", "-i", str(mp4), "-frames:v", "1",
                            "-q:v", "4", str(out / f"{d}.jpg")], check=True)
            print("recorded", d)
        await b.close()
    shutil.rmtree(tmp, ignore_errors=True)

asyncio.run(main())
