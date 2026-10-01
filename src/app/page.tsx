import { ClaimMarquee } from "@/components/home/ClaimMarquee";
import { Experiences } from "@/components/home/Experiences";
import { FeelsLikeFlying } from "@/components/home/FeelsLikeFlying";
import { Fleet } from "@/components/home/Fleet";
import { Hero } from "@/components/home/Hero";
import { Locations } from "@/components/home/Locations";
import { Moments } from "@/components/home/Moments";
import { OnlyOne } from "@/components/home/OnlyOne";
import { ShopTeaser } from "@/components/home/ShopTeaser";
import { Statement } from "@/components/home/Statement";
import { Tech } from "@/components/home/Tech";
import { Testimonials } from "@/components/home/Testimonials";
import { ButtonLink } from "@/components/ui/Button";
import { story, testimonials } from "@/data/content";
import { getCatalog } from "@/lib/catalog";
import { videos } from "@/lib/media";
import { site } from "@/lib/site";
import type { Product } from "@/lib/types";

const teaserSlugs = ["lift5-4-9-sport", "liftx-4-8", "elite-hand-controller", "lcs-lift-jet"];

export default async function HomePage() {
  const catalog = await getCatalog();
  const lessons = catalog.filter((p) => p.category === "lessons");
  const teaser = teaserSlugs.map((slug) => catalog.find((p) => p.slug === slug)).filter((p): p is Product => Boolean(p));

  return (
    <>
      <Hero />
      <ClaimMarquee />
      <OnlyOne />
      <FeelsLikeFlying />
      <Experiences lessons={lessons} />
      <Fleet />
      <Statement
        video={videos.darkOcean}
        eyebrow={story.friday.title}
        lines={[
          "That Friday feeling,",
          <span key="s" className="serif text-[1.08em] text-teal">
            every day of the week
          </span>,
        ]}
        body={story.friday.body}
      />
      <Locations />
      <Tech />
      <Testimonials items={testimonials} />
      <Moments />
      <ShopTeaser products={teaser} />
      <Statement
        video={videos.sunsetDuo}
        eyebrow={site.claim}
        lines={[
          "Your first flight",
          <span key="s" className="serif text-[1.1em] text-teal">
            is 15 minutes
          </span>,
          "from London",
        ]}
      >
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/lessons" size="lg">
            Book a lesson
          </ButtonLink>
          <ButtonLink href={site.phone.href} size="lg" variant="ghost" icon="phone">
            {site.phone.display}
          </ButtonLink>
        </div>
      </Statement>
    </>
  );
}
