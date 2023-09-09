"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertCircle } from "lucide-react";

type Props = {
  userId: string;
  onDeleteHandler: (userId: string) => void;
};

export default function DeleteProjectAndProfileCard({
  userId,
  onDeleteHandler,
}: Props) {
  const [isDeleting, setIsDeleting] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Delete Account</CardTitle>
        <CardDescription>
          This will delete your project and profile.
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start justify-between p-4 bg-secondary space-y-3 sm:space-y-0 sm:flex-row sm:items-center">
        <p className="sm:max-w-prose">
          <small>
            Please only do this if you are certain you want to delete everything
          </small>
        </p>
        <Button
          size="sm"
          type="button"
          variant="destructive"
          onClick={() => setIsDeleting(true)}
          className="w-full sm:w-20"
        >
          Delete
        </Button>
      </CardFooter>
      <Transition.Root show={isDeleting} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setIsDeleting}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transition-all bg-secondary sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <AlertCircle className="h-8 w-8 stroke-2 stroke-destructive fill-none" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-7"
                      >
                        Delete project and profile
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete project and profile?
                          All of your data will be permanently removed from our
                          servers forever. This action cannot be undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <Button
                      variant="destructive"
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold shadow hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => onDeleteHandler(userId)}
                    >
                      Delete
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      className="mt-3 inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsDeleting(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </Card>
  );
}
