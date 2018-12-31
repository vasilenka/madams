import React from 'react';

import './../index.scss';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';

import Text from '../app/components/Text/Text';
import Button from '../app/components/Button/Button';
import Textfield from '../app/components/Textfield/Textfield';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('Primary', () => (
    <Button primary onClick={action('clicked')}>
      Button primary
    </Button>
  ))
  .add('Primary Small', () => (
    <Button primary small onClick={action('clicked')}>
      Button primary small
    </Button>
  ))

  .add('Secondary', () => (
    <Button secondary onClick={action('clicked')}>
      Button secondary
    </Button>
  ))
  .add('Secondary Small', () => (
    <Button secondary small onClick={action('clicked')}>
      Button secondary small
    </Button>
  ))

  .add('Secondary-Alt', () => (
    <Button secondaryAlt onClick={action('clicked')}>
      Button default alt
    </Button>
  ))
  .add('Secondary-Alt Small', () => (
    <Button secondaryAlt small onClick={action('clicked')}>
      Button default small
    </Button>
  ));

storiesOf('Text', module)
  .add('Heading1', () => (
    <Text heading1 component="h1">
      Heading 1
    </Text>
  ))
  .add('Heading2', () => (
    <Text heading2 component="h2">
      Heading 2
    </Text>
  ))
  .add('Heading3', () => (
    <Text heading3 component="h2">
      Heading 3
    </Text>
  ))
  .add('Heading4', () => (
    <Text heading4 component="h4">
      Heading 4
    </Text>
  ))
  .add('Heading5', () => (
    <Text heading5 component="h5">
      Heading 5
    </Text>
  ))
  .add('Heading6', () => (
    <Text heading6 component="h6">
      Heading 6
    </Text>
  ))
  .add('Paragraph Large', () => (
    <Text component="p" large>
      Paragraph Large
    </Text>
  ))
  .add('Paragraph Medium', () => (
    <Text component="p" medium>
      Paragraph Medium
    </Text>
  ))
  .add('Paragraph Small', () => (
    <Text component="p" small>
      Paragraph Small
    </Text>
  ))

  .add('Message', () => <Text message>Message</Text>)
  .add('Highlight', () => <Text highlight>Message</Text>)

  .add('Link', () => <Text link>Link</Text>)

  .add('Caption', () => (
    <Text caption component="h6">
      Caption
    </Text>
  ))
  .add('Caption Bold', () => (
    <Text captionBold component="h6">
      Caption Bold
    </Text>
  ))

  .add('Label', () => (
    <Text labelMedium component="label">
      Input label
    </Text>
  ))
  .add('Label Small', () => (
    <Text labelSmall component="label">
      Input label small
    </Text>
  ));

storiesOf('Text Field', module)
  .add('Textfield', () => (
    <Textfield
      id="new one"
      label="Textfield label"
      placeholder="Input your text here..."
    />
  ))

  .add('Textfield Small', () => (
    <Textfield
      id="hello world"
      small
      label="Textfield label"
      placeholder="Input your text here..."
    />
  ))

  .add('Textfield Error', () => (
    <Textfield
      id="street"
      errorMessage="Address field is required"
      label="Street address"
    />
  ));
