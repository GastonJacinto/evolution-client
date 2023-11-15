'use server';

import { getErrorMessage } from '@/utils/utils';
import { v2 as cloudinary } from 'cloudinary';
import { writeFile } from 'fs/promises';
import path from 'path';
import { Buffer } from 'buffer';

cloudinary.config({
  cloud_name: 'db7wpgkge',
  api_key: '126277354111394',
  api_secret: 'mfex9EIbjYYSfUqrwPmOT2ilqaU',
});
type PlanDataType = {
  price?: number;
  credits?: number;
  description?: string;
  image?: string;
};
export const editPlan = async (formData: FormData, planId: string) => {
  let data;
  let response;
  const image = formData.get('image') as File | null;
  const description = formData.get('description') as string;
  const price = formData.get('price') as string;
  const credits = formData.get('credits') as string;
  const planData: PlanDataType = {
    description,
    price: +price,
    credits: +credits,
  };
  if (image) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const response = await new Promise<{ secure_url?: string; error?: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream({}, (error, result) => {
            if (error) {
              return resolve({
                error: getErrorMessage(error),
              });
            }
            if (!result) {
              return resolve({
                error: 'Error al subir la imágen.',
              });
            }
            resolve(result);
          })
          .end(buffer);
      }
    );
    planData.image = response.secure_url;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/plans/${planId}`,
    {
      method: 'PATCH',
      body: JSON.stringify(planData),
      headers: { 'Content-Type': 'application/json' },
    }
  );
  data = await res.json();
  if (data.statusCode) {
    return {
      error: getErrorMessage(data),
    };
  }

  return { data };
};
