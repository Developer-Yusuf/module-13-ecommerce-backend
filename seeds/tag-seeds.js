const { Tag } = require('../models');

const tagData = [
  {
    tag_name: 'Vibrant',
  },
  {
    tag_name: 'Modern',
  },
  {
    tag_name: 'Country Men',
  },
  {
    tag_name: 'Sport',
  },
  {
    tag_name: 'New',
  },
  {
    tag_name: 'Hot',
  },
  {
    tag_name: 'gold',
  },
  {
    tag_name: 'Classical',
  },
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;
