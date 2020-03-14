import { createStackNavigator } from 'react-navigation';
import Tickets from './FAQs/Tickets';



const VenueInfoNavigator = createStackNavigator({
  Tickets: {
    screen: Tickets
  }
});

export default VenueInfoNavigator;
