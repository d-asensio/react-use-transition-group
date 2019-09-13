import { configure, addDecorator, addParameters } from '@storybook/react';
import { themes } from '@storybook/theming'
import { withKnobs } from '@storybook/addon-knobs';

addParameters({
  options: {
    theme: themes.dark,
  },
});

addDecorator(withKnobs);

const req = require.context('../src/', true, /.*\.(stories|story)\.(js|jsx|ts|tsx)?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
