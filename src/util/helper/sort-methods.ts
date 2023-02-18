import { MethodRouteEnum } from '@enum/method-route.enum';

export const sortAndUniqueMethods = (
  methods: MethodRouteEnum[] | undefined,
) => {
  if (!methods) return [];

  // unique methods
  const methodsUnique = [...new Set(methods)];

  const methodsUniqueSorted: MethodRouteEnum[] = [];

  // sort methods
  if (methodsUnique.includes(MethodRouteEnum.GET)) methodsUniqueSorted.unshift(MethodRouteEnum.GET);

  if (methodsUnique.includes(MethodRouteEnum.POST)) methodsUniqueSorted.push(MethodRouteEnum.POST);

  if (methodsUnique.includes(MethodRouteEnum.PUT)) methodsUniqueSorted.push(MethodRouteEnum.PUT);

  if (methodsUnique.includes(MethodRouteEnum.DELETE)) methodsUniqueSorted.push(MethodRouteEnum.DELETE);

  return methodsUniqueSorted;
};
