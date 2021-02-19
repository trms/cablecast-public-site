import classic from 'ember-classic-decorator';
import Model, { attr, belongsTo } from '@ember-data/model';

@classic
export default class Chapter extends Model {
    @belongsTo('vod', {async: true})
    vod;

    @attr('string', {defaultValue: 'New Chapter'})
    title;

    @attr('string', {defaultValue: ''})
    body;

    @attr('string', {defaultValue: ''})
    link;

    @attr('number', {defaultValue: 0})
    offset;

    @attr('boolean', {defaultValue: false})
    quickAdded;

    @attr('boolean', {defaultValue: false})
    deleted;
}
