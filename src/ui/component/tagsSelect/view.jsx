import classNames from 'classnames';
import React, { useEffect, useState, useRef } from 'react';
import { Form, FormField } from 'component/common/form';
import { Tags, Tag } from 'component/tags/view.jsx';
import { animated, useTransition } from 'react-spring';

const unfollowedTagsAnimation = {
  from: {
    opacity: 0,
  },
  enter: { opacity: 1, maxWidth: 200 },
  leave: { opacity: 0, maxWidth: 0 },
};

const followedTagsAnimation = {
  from: {
    opacity: 0,
    maxHeight: 0,
    // maxWidth: 0,
    // transform: `translate3d(0, -40px, 0)`,
  },
  enter: {
    opacity: 1,
    maxWidth: 200,
    maxHeight: 50,
    // transform: `translate3d(0, 0, 0)`
  },
  leave: { opacity: 0, maxWidth: 0, maxHeight: 0 },
  trail: 100,
};

type Props = {
  onSelect: string => void,
  selected: Array<string>,
  selectableTags: Array<string>,
};

export default function TagSelect(props: Props) {
  const { unfollowedTags, followedTags, doToggleTagFollow, doAddTag, doDeleteTag } = props;
  const [newTag, setNewTag] = useState('');

  const suggestedTags = unfollowedTags
    .filter(({ name }) => (newTag ? name.toLowerCase().includes(newTag.toLowerCase()) : true))
    .slice(0, 5);

  // Animation for tag entrance and leave
  const suggestedTransitions = useTransition(suggestedTags, tag => tag.name, unfollowedTagsAnimation);
  const followedTransitions = useTransition(followedTags, tag => tag.name, followedTagsAnimation);

  function onChange(e) {
    setNewTag(e.target.value);
  }

  function handleSubmit() {
    setNewTag('');

    if (!unfollowedTags.includes(newTag)) {
      doAddTag(newTag);
    }

    if (!followedTags.includes(newTag)) {
      doToggleTagFollow(newTag);
    }
  }

  return (
    <section>
      <div className="tags tags--selected">
        {followedTransitions.map(({ item, key, props }) => (
          <animated.div style={props} key={key}>
            <Tag name={item.name} isSelected onClick={() => doDeleteTag(item.name)} />
          </animated.div>
        ))}
      </div>

      <Form onSubmit={handleSubmit}>
        <FormField
          autoFocus
          label={__('Tags')}
          onChange={onChange}
          placeholder="Search for more tags"
          type="text"
          value={newTag}
        />
      </Form>

      <div className="tags">
        {suggestedTransitions.map(({ item, key, props }) => (
          <animated.div style={props} key={key}>
            <Tag name={item.name} onClick={() => doToggleTagFollow(item.name)} />
          </animated.div>
        ))}
        {!suggestedTransitions.length && <p className="empty tags__empty-message">No suggested tags</p>}
      </div>
    </section>
  );
}
