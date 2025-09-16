import { Button } from "@/components/ui/button"
import UserPopover from "../shared/user-popover"
import LanguageSelector from "../shared/language-selector"
import { navigationItems } from "@/utils/static"
import { Link } from "@/i18n/navigation"
import { CatalogSheet } from "./catalog-sheet"
import { MobileMenu } from "./mobile-menu"
import Container from "../shared/container"
import FavComp from "./favcomp"
import { getLocale, getTranslations } from "next-intl/server"
import { getServerQueryClient } from "@/providers/server"
import { getUserQuery } from "@/services/auth/queries"
import { cookies } from "next/headers"
import { User } from "@/types"
import { getCategoriesQuery, getProductsQuery } from "@/services/products/queries"
import { SearchBox } from "./SearchBox"

export async function Header() {
  const t = await getTranslations("navigation")
  const locale = await getLocale()
  const token = (await cookies()).get("access_token")?.value as string;
  const queryClient = getServerQueryClient();

  await Promise.all([
    queryClient.prefetchQuery(getUserQuery(token)),
    queryClient.prefetchQuery(getCategoriesQuery()),
    queryClient.prefetchQuery(getProductsQuery(locale)),
  ]);
  const userData = queryClient.getQueryData(getUserQuery(token).queryKey);
  const user = userData?.data;

  const categoriesData = queryClient.getQueryData(getCategoriesQuery().queryKey);
  const categories = categoriesData?.data;
  const latestProductsData = queryClient.getQueryData(getProductsQuery(locale).queryKey);
  const latestProducts = latestProductsData?.data;

  return (
    <div>
      <header className="w-full bg-white border-b fixed z-50 top-0 left-0 right-0">
        <div className="hidden md:block">
          <Container>
            <div className="flex items-center py-3 justify-between text-sm border-b border-gray-200">
              <nav className="flex items-center space-x-6 font-medium">
                {navigationItems.map((item) => (
                  <Link key={item.label} href={item.href} className="text-[#77777B] hover:text-gray-900">
                    {t(item.label)}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center space-x-4">
                <LanguageSelector />
                <div className="w-px h-4 bg-gray-200" />
                <UserPopover user={user as User} />
              </div>
            </div>
          </Container>
        </div>

        <Container>
          <div className="flex items-center justify-between h-[84px]">
            <div className="flex items-center gap-2 md:gap-8">
              <div className="md:hidden">
                <MobileMenu user={user as User} categories={categories || []} />
              </div>

              <Link href="/" className="flex items-center">
                <h1 className="text-xl md:text-[32px] font-semibold text-black">Fleur Garden</h1>
              </Link>

              <div className="hidden md:block">
                <CatalogSheet categories={categories || []} />
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-[500px] mx-8">
              <SearchBox latestProducts={latestProducts}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                    <path d="M6.00005 9V4C6.00005 3.20435 6.31612 2.44129 6.87873 1.87868C7.44133 1.31607 8.2044 1 9.00005 1C9.7957 1 10.5588 1.31607 11.1214 1.87868C11.684 2.44129 12 3.20435 12 4V9M3.33105 6H14.67C14.9584 5.99997 15.2434 6.06229 15.5054 6.1827C15.7674 6.30311 16.0003 6.47876 16.1881 6.6976C16.3759 6.91645 16.5141 7.17331 16.5933 7.45059C16.6726 7.72786 16.6909 8.01898 16.647 8.304L15.392 16.456C15.2831 17.1644 14.9241 17.8105 14.38 18.2771C13.836 18.7438 13.1428 19.0002 12.426 19H5.57405C4.85745 19 4.16453 18.7434 3.62068 18.2768C3.07683 17.8102 2.71797 17.1643 2.60905 16.456L1.35405 8.304C1.31022 8.01898 1.32854 7.72786 1.40775 7.45059C1.48697 7.17331 1.62521 6.91645 1.81299 6.6976C2.00078 6.47876 2.23367 6.30311 2.49569 6.1827C2.75772 6.06229 3.04268 5.99997 3.33105 6Z" stroke="#20201E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </Button>
              </Link>
              <FavComp />

              <div className="block md:hidden">
                <UserPopover user={user as User} />
              </div>
            </div>
          </div>
        </Container>
      </header>
    </div>
  )
}
