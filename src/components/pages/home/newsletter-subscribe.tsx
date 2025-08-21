import Container from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getTranslations } from "next-intl/server";

export async function NewsletterSubscribe() {
  const t = await getTranslations("newsletter");

  return (
    <section className="pb-16 md:pb-[121px]">
      <Container>
        <div className="rounded-2xl bg-[#F6F6F6] px-4 py-8 md:px-10 md:py-10">
          <div className="grid items-center gap-6 md:grid-cols-2">
            <div className="space-y-6 max-w-[500px]">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                {t("title")}
              </h2>
              <p className="text-muted-foreground md:text-base">
                {t("subtitle")}
              </p>
            </div>
            <form className="flex w-full items-center gap-3 md:justify-end">
              <Input
                type="email"
                placeholder={t("placeholder")}
                aria-label={t("emailLabel")}
                className="h-12 w-full max-w-[520px] rounded-lg md:w-[520px]"
              />
              <Button className="h-12 rounded-lg px-6 md:px-8">
                {t("cta")}
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}


