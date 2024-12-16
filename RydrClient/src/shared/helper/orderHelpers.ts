import { getOrderByUserIdAndStatus } from '../../store/features/order/order-slice';

export const fetchCurrentUserOrder = async (dispatch, profileSub) => {
    if (!profileSub) {
      console.error('User ID (profile.sub) is missing.');
      return null;
    }
  
    try {
      const activeOrder = await dispatch(
        getOrderByUserIdAndStatus({
          userId: profileSub,
          status: 'NEW' || 'PICKING_UP_CLIENT',
        })
      ).unwrap();
  
      if (activeOrder) {
        console.log('Active Order Found:', activeOrder);
        return activeOrder;
      }
  
      return null;
    } catch (error) {
      console.error('Error fetching active order:', error);
      return null;
    }
  };
  