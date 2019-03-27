import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import Tree from './index';
import { default as mockData } from '../example/source';

describe('Tree Component', () => {
  it('Should match snapshot', () => {
    const tree = renderer.create(<Tree source={mockData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should toggle lower level branches when expand icon is clicked', () => {
    const wrapper = shallow(<Tree source={mockData} />);
    const branchNumberBefore = wrapper.find('div').length;
    const expandToggles = wrapper.find('i');
    const randomIndex = Math.floor(Math.random() * expandToggles.length);
    const expandToggle = expandToggles.at(randomIndex);
    expandToggle.simulate('click');
    const branchNumberAfter = wrapper.find('div').length;
    expect(branchNumberAfter).not.toEqual(branchNumberBefore);
  });

  it('Should select child branches when parent branch is selected', () => {
    const wrapper = shallow(<Tree source={mockData} />);
    const getCheckbox = label =>
      wrapper
        .findWhere(n => n.text() === label && n.type() === 'span')
        .closest('div')
        .find('[type="checkbox"]');

    const parentCheckbox = getCheckbox('Australia');
    const childrenCheckboxs = [
      getCheckbox('NSW'),
      getCheckbox('QLD'),
      getCheckbox('Victoria'),
      getCheckbox('Western Australia'),
      getCheckbox('ACT')
    ];

    parentCheckbox.simulate('change');

    childrenCheckboxs.every(cb => expect(cb.props().checked).toEqual(true));
  });
});
