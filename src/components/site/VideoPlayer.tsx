import { useRef, useState } from "react";
import { Play } from "lucide-react";
const photo = "/home-raphaela.webp";
import { VIDEO_CAPTIONS_URL, VIDEO_URL, YOUTUBE_VIDEO_ID } from "@/config/contact";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/tracking";

export function VideoPlayer() {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const completed = useRef(false);

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-xl border border-rose/30 bg-wine shadow-soft">
      {active && YOUTUBE_VIDEO_ID ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&playsinline=1&rel=0`}
          title="Dra. Raphaela Grassi — Assistência jurídica em prisões em flagrante"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : active && VIDEO_URL ? (
        <video
          ref={ref}
          src={VIDEO_URL}
          controls
          autoPlay
          playsInline
          preload="none"
          className="h-full w-full object-cover"
          onPlay={() => track("video_play", { section_name: "video" })}
          onEnded={() => {
            if (completed.current) return;
            completed.current = true;
            track("video_complete", { section_name: "video" });
          }}
        >
          {VIDEO_CAPTIONS_URL && <track kind="captions" src={VIDEO_CAPTIONS_URL} srcLang="pt" label="Português" default />}
        </video>
      ) : (
        <Button
          type="button"
          variant="ghost"
          onClick={() => YOUTUBE_VIDEO_ID || VIDEO_URL ? setActive(true) : alert("Vídeo ainda não enviado.")}
          className="group absolute inset-0 block h-full w-full rounded-none p-0 hover:bg-transparent"
          aria-label="Reproduzir vídeo da Dra. Raphaela Grassi sobre prisão em flagrante"
        >
          <img src={photo} alt="Dra. Raphaela Grassi, advogada criminalista em Campo Grande/MS" loading="lazy" width={585} height={942} className="h-full w-full object-cover object-top opacity-80 transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-copper-gradient text-primary-foreground shadow-copper transition-transform group-hover:scale-110">
            <Play className="ml-1 h-8 w-8" fill="currentColor" />
          </span>
          <span className="absolute bottom-6 left-0 right-0 px-6 text-center font-display text-lg text-cream">
            Assistência jurídica em prisões em flagrante
          </span>
        </Button>
      )}
    </div>
  );
}
