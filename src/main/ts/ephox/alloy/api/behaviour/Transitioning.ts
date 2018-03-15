import Behaviour from './Behaviour';
import ActiveTransitioning from '../../behaviour/transitioning/ActiveTransitioning';
import TransitionApis from '../../behaviour/transitioning/TransitionApis';
import TransitionSchema from '../../behaviour/transitioning/TransitionSchema';
import { Objects } from '@ephox/boulder';
import { Obj } from '@ephox/katamari';

var createRoutes = function (routes) {
  var r = { };
  Obj.each(routes, function (v, k) {
    var waypoints = k.split('<->');
    r[waypoints[0]] = Objects.wrap(waypoints[1], v);
    r[waypoints[1]] = Objects.wrap(waypoints[0], v);
  });
  return r;
};

var createBistate = function (first, second, transitions) {
  return Objects.wrapAll([
    { key: first, value: Objects.wrap(second, transitions) },
    { key: second, value: Objects.wrap(first, transitions) }
  ]);
};

var createTristate = function (first, second, third, transitions) {
  return Objects.wrapAll([
    {
      key: first,
      value: Objects.wrapAll([
        { key: second, value: transitions },
        { key: third, value: transitions }
      ])
    },
    {
      key: second,
      value: Objects.wrapAll([
        { key: first, value: transitions },
        { key: third, value: transitions }
      ])
    },
    {
      key: third,
      value: Objects.wrapAll([
        { key: first, value: transitions },
        { key: second, value: transitions }
      ])
    }
  ]);
};

export default <any> Behaviour.create({
  fields: TransitionSchema,
  name: 'transitioning',
  active: ActiveTransitioning,
  apis: TransitionApis,
  extra: {
    createRoutes: createRoutes,
    createBistate: createBistate,
    createTristate: createTristate
  }
});