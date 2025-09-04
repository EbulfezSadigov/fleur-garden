import { queryOptions } from "@tanstack/react-query";
import { getAbout, getAdvantages } from "./api";

const getAboutQuery = (locale: string) => {
    return queryOptions({
        queryKey: ["about"],
        queryFn: () => getAbout(locale),
    });
};

const getAdvantagesQuery = (locale: string) => {
    return queryOptions({
        queryKey: ["advantages"],
        queryFn: () => getAdvantages(locale),
    });
};

export { getAboutQuery, getAdvantagesQuery };   