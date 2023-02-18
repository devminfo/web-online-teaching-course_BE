import { IRouterResource } from '@interface/refactor-router-response.interface';

class RouterHelper {
  constructor() { }

  /**
 * get resource from request
 * @param _router
 * @returns
 */
  public getResourceFromRouter = (_router: any): IRouterResource[] => {
    // const router = <Router>req.app._router;
    const resourceList = new Map<
      String,
      Pick<IRouterResource, 'methods' | 'collectionName'>
    >();

    // loop stack in router
    _router.stack.forEach((layer: any) => {
      const { route } = layer;

      // check route exist
      if (route) {
        const url = route.path;
        const method = route?.stack[0].method.toUpperCase();
        const collectionName = this.getCollectionNameByUrl(url);

        // map values
        const mapValues = resourceList.get(url);

        // check mapValues exist
        if (mapValues) {
          // update mapValues
          const value = {
            methods: [...mapValues.methods, method],
            collectionName: mapValues.collectionName,
          };

          // set
          resourceList.set(url, value);
        } else {
          // set new
          resourceList.set(url, {
            methods: [method],
            collectionName,
          });
        }
      }
    });

    const result: IRouterResource[] = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const resource of resourceList) {
      result.push({ url: resource[0], ...resource[1] });
    }

    // return routes
    return result;
  };

  /**
   * Create collectionName by url
   * @param url
   * @returns
   */
  public getCollectionNameByUrl(url: any) {
    const collectionName = url.startsWith('/v1/')
      ? url.split('/')[2].trim().replace(/-/g, '')
      : '';

    return collectionName
      && collectionName !== 'auth'
      && collectionName !== 'uploads'
      ? collectionName
      : '';
  }

  /**
   * Get collection names
   * @param _router
   * @returns
   */
  public getCollectionNames = (_router: any): string[] => {
    // const resourceList = this.getResourceFromRequest(req);
    const resourceList = this.getResourceFromRouter(_router);

    const collectionNameSet = new Set<string>();

    resourceList.forEach((resource) => {
      if (resource.collectionName) collectionNameSet.add(resource.collectionName);
    });

    return [...collectionNameSet];
  };

  /**
   * Update valid url
   * @param url
   * @return url
   */
  public updateValidUrl(url: string) {
    // eslint-disable-next-line no-param-reassign
    if (!url.startsWith('/')) url = `/${url}`;

    // eslint-disable-next-line no-param-reassign
    if (url.endsWith('/')) url = url.slice(0, -1);

    return url;
  }
}

export const routerHelper = new RouterHelper();
