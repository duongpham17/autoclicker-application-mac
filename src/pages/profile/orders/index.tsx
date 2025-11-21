import {Fragment, useMemo} from 'react';
import { useAppDispatch, useAppSelector } from '@redux/hooks/useRedux';
import Orders from '@redux/actions/orders';
import useOpen from '@hooks/useOpen';
import Container from '@components/containers/Style1';
import Form from '@components/forms/Style1';
import Text from '@components/texts/Style2';
import Cover from '@components/covers/Style2';
import Loader from '@components/loaders/Style2';

const OrdersContainer = () => {

    const cost = 5

    const dispatch = useAppDispatch();

    const {orders} = useAppSelector(state => state.orders);

    const {open, onOpen, values, setValues} = useOpen({});

    const total = useMemo(() => {
      if(!orders || !orders.length) return 0;
      const total = orders.map(el => el.credit * cost).reduce((arr, cur) => arr + cur);
      return total
    }, [orders])

    const customOpen = async () => {
      setValues("loading");
      onOpen();
      if(!orders) await dispatch(Orders.find());
      setValues("");
    }

  return (
    <>
      <button onClick={customOpen}>Payment History</button>

      {open && 
        <Cover open={open} onClose={onOpen}>
          <Form onSubmit={() => {}}>
            {values ==="loading"? <Loader/> :
              <Fragment>
                <Container color="dark">
                  <Text size={18}>Purchase History [ {orders?.length} ] [ Total: £{total} ]</Text>
                </Container>
                {orders?.map((el, index) => 
                  <Container key={el._id}>
                    <Text color="light">{index+1}. {new Date(el.createdAt).toISOString().split("T").join(", ").split(".")[0]}</Text>
                    {el.email && <Text>{el.email}</Text>}
                    <Text>£{(el.credit * cost).toFixed(2)} - Credit [ {el.credit} ]</Text>
                  </Container>
                )}
              </Fragment>
            }
          </Form>
        </Cover>
      }
    </>
  )
}

export default OrdersContainer