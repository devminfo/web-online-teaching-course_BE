import path from 'path';

export const editFileName = (
  req: any,
  file: any,
  callback: (error: Error | null, filename: string) => void,
) => {
  const fileExtName = path.extname(file.originalname);
  const randomNamePre = Array(24)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const randomNameSux = Array(16)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(
    null,
    `${Date.now()}_${randomNamePre}_${randomNameSux}${fileExtName}`,
  );
};

export const imageFileFilter = (
  extAllowed: string,
  req: any,
  file: any,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
  const expression = `.(${extAllowed})$`;

  if (!file.originalname.match(new RegExp(expression))) {
    return callback(new Error('Format files are allowed!'), false);
  }

  callback(null, true);
};
