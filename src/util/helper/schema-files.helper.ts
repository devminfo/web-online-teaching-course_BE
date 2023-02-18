import { glob } from 'glob';

/**
 * Get all schema files
 * @returns Promise
 */
export const getAllSchemaFilesHelper = () => {
  return new Promise(
    (resolve: (value: any) => void, reject: (reason?: any) => void) => {
      // options
      const options = { cwd: `${process.cwd()}/dist/route` };
      // callback
      const callback = (error: any, filesWithJS: any) => {
        // if(error) => reject
        if (error) return reject(error);

        // create response
        const result = filesWithJS.map((file: string) => {
          const schemaFile = file.split('/')[4];
          const schemaName = schemaFile.replace(/-|.schema.js$/g, '');

          return {
            name: schemaName,
            path: file,
          };
        });

        // resolve response
        resolve(result);
      };

      // run glob
      glob('**/*schema.js', options, callback);
    },
  );
};
