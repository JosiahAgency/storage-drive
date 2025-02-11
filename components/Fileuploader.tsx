'use client';

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button';
import { cn, convertFileToUrl, getFileType } from '@/lib/utils';
import Image from 'next/image';
import Thumbnail from './Thumbnail';
import { MAX_FILE_SIZE } from '@/constants';
import { useToast } from '@/hooks/use-toast';
import { uploadFile } from '@/lib/actions/file.actions';
import { usePathname } from 'next/navigation';

interface Props {
  ownerId: string,
  accountId: string,
  className?: string,
}

const Fileuploader = ({ ownerId, accountId, className }: Props) => {

  const path = usePathname();

  const { toast } = useToast();

  const [files, setfiles] = useState<File[]>([])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {

    setfiles(acceptedFiles)

    const uploadPromises = acceptedFiles.map(async (file) => {

      if (file.size > MAX_FILE_SIZE) {

        setfiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));

        return toast({

          title: 'File too large',
          description: (
            <p className="body-2 text-white">
              <span className="font-semibold">
                {file.name}
              </span> The file you tried to upload is too large. Please choose a file less than 50MB.
            </p>
          ),

          className: 'error-toast'
        })
      }

      return uploadFile({ file, ownerId, accountId, path })
        .then((uploadFile) => {
          if (uploadFile) {
            setfiles((prevFiles) => prevFiles.filter((f) => f.name !== file.name));
          }
        })
    })

    await Promise.all(uploadPromises)

  }, [ownerId, accountId, path, toast])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  const handleRemoveFile = (e: React.MouseEvent<HTMLImageElement, MouseEvent>, fileName: string) => {

    e.stopPropagation();
    setfiles((prevFiles) => prevFiles.filter((file) =>
      file.name !== fileName));

  }

  return (

    <div {...getRootProps()} className='cursor-pointer'>

      <input {...getInputProps()} />

      <Button type="button" className={cn('uploader-button', className)}>
        <Image src='/icons/upload.svg' alt='upload' width={24} height={24} />
        <p>Upload Files</p>
      </Button>

      {files.length > 0 &&

        <ul className="uploader-preview-list">

          <h4 className="h4 text-light-100">Uploading</h4>

          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name) as { type: 'image' | 'video' | 'document', extension: string };

            return (

              <li key={`${file.name}-${index}`} className='uploder-preview-item'>

                <div className="flex items-center gap-3">

                  <Thumbnail type={type} extension={extension} url={convertFileToUrl(file)} />

                  <div className="preview-item-name">

                    {file.name}

                    <Image
                      src='/icons/file-loader.gif'
                      alt='loader'
                      width={80}
                      height={26}
                      onClick={() => {
                        setfiles(files.filter((_, i) => i !== index))
                      }}
                    />

                  </div>

                  <Image
                    src='/icons/remove.svg'
                    alt='remove'
                    width={24}
                    height={24}
                    onClick={(e) => {
                      handleRemoveFile(e, file.name)
                    }}
                  />

                </div>
              </li>
            )
          })}
        </ul>
      }
    </div>
  )
}

export default Fileuploader