import Vue from 'vue';
import 'muse-ui/lib/styles/base.less';
import { IndexList, IndexSection, Popup} from 'mint-ui'
import { Avatar, Dialog, Stepper, Button, ExpansionPanel, Badge, Snackbar, Select, Radio ,AppBar, Icon, Tabs, LoadMore, TextField, BottomNav, Carousel, List, Divider, SubHeader,} from 'muse-ui';
import 'muse-ui/lib/styles/theme.less';
import theme from 'muse-ui/lib/theme';
import Helpers from 'muse-ui/lib/Helpers';
import Message from 'muse-ui-message';
import 'muse-ui-message/dist/muse-ui-message.css';

Vue.use(Button).use(Select).use(Dialog).use(Stepper).use(ExpansionPanel).use(Message).use(Snackbar).use(AppBar).use(TextField).use(BottomNav).use(Carousel).use(List).use(Divider).use(SubHeader);
Vue.use(Icon).use(Tabs).use(LoadMore).use(Avatar).use(Badge).use(Radio);

Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Popup.name, Popup);

theme.add('teal', {
  primary: '#2c8cf9',
  secondary: '#ff4081',
  success: '#4caf50',
  warning: '#ffeb3b',
}, 'light');

theme.use('teal');
Vue.use(Helpers);