import * as f from 'futil-js'
import * as _ from 'lodash/fp'

f.dotJoin(['a', 'b', 'c'])

const slashJoin = f.compactJoin('/')
slashJoin(['a', 'b', 'c'])

const dotJoinWithGt5 = f.dotJoinWith(x => x > 5)
dotJoinWithGt5([1, 2, 3, 4, 5])

f.repeated(['a', 'b'])
f.repeated([1, 2, 3])

