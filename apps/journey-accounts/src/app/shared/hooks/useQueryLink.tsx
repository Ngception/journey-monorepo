import { useSearchParams } from 'react-router-dom';

export const useQueryLink = () => {
  const [searchParams] = useSearchParams();

  const getQueryParam = (param: string) => {
    return searchParams.get(param);
  };

  const getQueryString = (param: string, value: string) => {
    const queryParam = searchParams.get(param);

    if (queryParam === value) {
      return `${param}=${queryParam}`;
    }

    return '';
  };

  return { getQueryParam, getQueryString };
};
