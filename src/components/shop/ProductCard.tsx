import Image from "next/image";
import Link from "next/link";
import { Badge, badgeTone, Price } from "@/components/ui/Primitives";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/format";
import type { Product } from "@/lib/types";

const isPhoto = (p: Product) => p.category === "lessons" || p.category === "used";

export function ProductCard({
  product,
  tone = "dark",
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  className,
}: {
  product: Product;
  tone?: "dark" | "light";
  sizes?: string;
  className?: string;
}) {
  const [first, second] = product.images;
  const photo = isPhoto(product);
  const swatches = product.variants.filter((v) => v.swatch);

  return (
    <Link href={`/shop/${product.slug}`} className={cn("group block", className)}>
      <div
        className={cn(
          "relative aspect-[4/5] overflow-hidden rounded-[1.6rem] transition-[border-radius] duration-700 ease-(--ease-expo) group-hover:rounded-[2.2rem]",
          photo ? "bg-ink-3" : "bg-sand"
        )}
      >
        {!photo ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#ffffff_0%,rgba(255,255,255,0)_65%)]" aria-hidden />
        ) : null}
        {first ? (
          <Image
            src={first}
            alt={product.name}
            fill
            sizes={sizes}
            className={cn(
              "transition-[transform,opacity] duration-700 ease-(--ease-expo)",
              photo ? "object-cover group-hover:scale-105" : "object-contain p-[9%] mix-blend-multiply group-hover:scale-[1.04]",
              second && !photo && "group-hover:opacity-0"
            )}
          />
        ) : null}
        {second && !photo ? (
          <Image
            src={second}
            alt=""
            fill
            sizes={sizes}
            className="scale-95 object-contain p-[9%] opacity-0 mix-blend-multiply transition-[transform,opacity] duration-700 ease-(--ease-expo) group-hover:scale-100 group-hover:opacity-100"
          />
        ) : null}
        {product.badges.length ? (
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {product.badges.slice(0, 2).map((b) => (
              <Badge key={b} tone={badgeTone(b)}>
                {b}
              </Badge>
            ))}
          </div>
        ) : null}
        {swatches.length ? (
          <div className="absolute bottom-4 left-4 flex gap-1.5" aria-label={`${swatches.length} colours`}>
            {swatches.map((v) => (
              <span key={v.name} title={v.name} className="size-3.5 rounded-full ring-1 ring-ink/15" style={{ backgroundColor: v.swatch ?? undefined }} />
            ))}
          </div>
        ) : null}
        <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-ink text-bone opacity-0 transition duration-500 ease-(--ease-expo) group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrowUpRight" className="size-4" />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          {product.collection ? (
            <p className={cn("eyebrow", tone === "dark" ? "text-bone/60" : "text-ink/60")}>{product.collection}</p>
          ) : null}
          <h3 className="mt-1.5 text-base font-medium leading-snug md:text-lg">{product.name}</h3>
        </div>
        <Price
          pence={product.pricePence}
          compareAt={product.compareAtPence}
          className={cn("shrink-0 text-sm md:text-base", product.purchaseMode === "sold" && "line-through opacity-60")}
        />
      </div>
    </Link>
  );
}
