import { updateView } from '@/packages/graph/helpers/backend/updateView';
import React, { useEffect, useState } from 'react';
import { useToggle } from '../../helpers/hooks/useToggle';
import IconCircleButton from '../molecules/IconCircleButton';
import { KeyedMutator } from 'swr';
import { updateGraphView } from '@/backend/functions/graph/mutate/updateGraphView';
import Modal from '../layouts/Modal';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '../ui/alert-dialog';

import { Icons } from '../icons';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog';
import { deleteGraphView } from '@/backend/functions/graph/mutate/deleteGraphView';

type TabProps = {
  mutateGraphViews: KeyedMutator<any>;
  id: string;
  title: string;
  selected: boolean;
  index: number;
  currTab: number;
  setCurrTab: (val: number) => void;
  switchWorkspace: (val: string) => void;
  tabs: any;
  setTabs: (val: any) => void;
  onClick?: (val: number) => void;
  viewType: 'document' | 'graph';
};
const Tab: React.FC<TabProps> = ({
  id,
  title,
  selected,
  index,
  currTab,
  setCurrTab,
  switchWorkspace,
  tabs,
  setTabs,
  viewType,
  onClick = (index: number, workspaceId: string) => {
    setCurrTab(index);
    switchWorkspace(workspaceId);
  },
  mutateGraphViews,
}) => {
  // const [showDel, setShowDel] = useState(false);

  const onClose = (index: number) => {
    if (currTab == tabs.length - 1) {
      setCurrTab(currTab - 1);
    }
    setTabs(tabs.filter((tab: any, i: number) => i != index));
  };

  const { value: isEditing, toggle: toggleIsEditing } = useToggle();
  const [showDelModal, setshowDelModal] = useState(false);

  useEffect(() => {
    const listenerFunc = (ev: any) => {
      if (ev.code == 'Enter') {
        toggleIsEditing(false);
      }
    };
    if (isEditing) {
      window.addEventListener('click', () => toggleIsEditing(false));
      window.addEventListener('keydown', (ev: any) => listenerFunc(ev));
    }

    return () => {
      window.removeEventListener('click', () => toggleIsEditing(false));
      window.removeEventListener('keydown', (ev: any) => listenerFunc(ev));
    };
  }, [isEditing]);

  return (
    <div
      onClick={() => onClick(index, id)}
      onDoubleClick={() => toggleIsEditing(true)}
      // onMouseOver={() => setShowDel(true)}
      // onMouseLeave={() => setShowDel(false)}
      className={
        'min-w-[9rem] h-10 border-lining border-r p-2 text-sm hover:cursor-pointer hover:bg-base_white flex flex-row items-center justify-between align-middle z-20 ' +
        (selected && ' bg-base_white')
      }
    >
      <div>
        {isEditing ? (
          <input
            className='outline-none border-none'
            onBlur={(e: any) => {
              console.log('update');
              let newTabs = [...tabs];
              newTabs[index].title = e.target.value;
              setTabs(newTabs);
              // console.log('new tabs ' + newTabs[index].title);

              mutateGraphViews(
                updateGraphView({
                  graphViewId: id,
                  graphViewData: { title: e.target.value },
                }),
                {
                  optimisticData: (data: any) => {
                    const newData = [...data];
                    // console.log('new rendering');
                    // console.log(newData);
                    // console.log(
                    // 	e.target.value,
                    // 	newData[index]
                    // );
                    newData[index - 1].g.properties.title = e.target.value;
                    // for (const x of newData) {
                    // 	console.log(x, newData[x])
                    // 	if (
                    // 		newData[x].g.properties.id ===
                    // 		id
                    // 	) {
                    // 		newData[x].g.properties.title =
                    // 			e.target.value;
                    // 	}
                    // }
                    return newData;
                  },
                  revalidate: true,
                  populateCache: false,
                }
              );
            }}
            defaultValue={title}
            autoFocus={true}
          />
        ) : (
          <h3>{title}</h3>
        )}
      </div>
      {viewType === 'graph' && (
        <>
          {/* <Dialog>
						<DialogTrigger asChild>
							<Icons.close className='h-4 w-4' />
						</DialogTrigger>
						<DialogContent className='sm:max-w-[425px]'>
							<DialogHeader>
								<DialogTitle>
									Delete this Graph View?
								</DialogTitle>
								<DialogDescription>
									This action cannot be undone. This will
									permanently delete this graph view (nodes
									will not be deleted).
								</DialogDescription>
							</DialogHeader>

							<DialogFooter>
								<Button
									variant='destructive'
									onClick={() => console.log('test')}
								>
									Delete
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog> */}
          <AlertDialog>
            <AlertDialogTrigger>
              <Icons.close className='h-4 w-4' />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this Graph View?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this graph view (nodes will not be deleted).
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className='bg-red-900'
                  onClick={() => {
                    mutateGraphViews(
                      deleteGraphView({
                        graphViewId: id,
                      }),
                      {
                        optimisticData: (data: any) => {
                          // tabs data
                          let newTabs = [...tabs];
                          newTabs.splice(index, 1);
                          setTabs(newTabs);

                          // useSWR data
                          const newData = [...data];
                          newData.splice(index - 1, 1);
                          return newData;
                        },
                        populateCache: false,
                      }
                    );
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {/* <Modal open={showDelModal} setOpen={setshowDelModal}>
				<p>
					this will delete the graph view permanently (but not the
					nodes inside), are you sure?
				</p>
				<button onClick={() => setshowDelModal(false)}>Cancel</button>
				<button
					onClick={() => {
						setshowDelModal(false);
						onClose(index);
					}}
				>
					Proceed
				</button>
			</Modal> */}
    </div>
  );
};
export default Tab;
