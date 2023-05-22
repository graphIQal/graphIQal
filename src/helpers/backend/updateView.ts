import { ViewContextInterface } from '../../components/context/ViewContext';

type ViewEditType = 'TAB_NAME';

export const updateView = (type: ViewEditType, newVal: any) => {
  console.log(newVal);
  switch (type) {
    case 'TAB_NAME':
      let newTabs = [...newVal.tabs];
      newTabs[newVal.index].label = newVal.newLabel;
      newVal.setTabs(newTabs);
      console.log('new tabs ' + newTabs[newVal.index].label);
  }
};
