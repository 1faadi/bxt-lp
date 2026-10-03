import { Reveal } from "./Reveal";

const testimonials = [
  {
    quote:
      "BXTrack brought rare clarity to a complicated operation. They understood the business before they wrote a line of code.",
    name: "Maya Chen",
    role: "COO, Atlas Freight",
  },
  {
    quote:
      "The team moved from product thinking to production engineering without losing context. That continuity changed the outcome.",
    name: "Daniel Brooks",
    role: "Founder, Meridian Clinics",
  },
  {
    quote:
      "We finally have a platform that makes the hard parts feel simple—for our team and our customers.",
    name: "Priya Nair",
    role: "VP Product, Forma Capital",
  },
] as const;

const delays = [0, 80, 160] as const;

export function Testimonials() {
  return (
    <section className="bg-[#eee7dc] px-5 py-20 text-[#171715] sm:px-8 lg:px-12 lg:py-[120px]">
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-[11px] font-medium tracking-[0.22em] text-[#716c63]">
            CLIENT PERSPECTIVES
          </p>
        </Reveal>

        <div className="mt-14 grid lg:mt-20 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={testimonial.name}
              className="border-t border-black/15 py-10 first:border-t-0 first:pt-0 lg:border-t-0 lg:border-l lg:px-10 lg:py-0 lg:first:border-l-0 lg:first:px-0 lg:last:pr-0"
              delay={delays[index]}
            >
              <figure className="flex h-full flex-col justify-between gap-14">
                <blockquote className="text-2xl leading-[1.35] tracking-[-0.025em]">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-[#777269]">
                    {testimonial.role}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
