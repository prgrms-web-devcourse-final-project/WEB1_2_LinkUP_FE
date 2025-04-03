import React from 'react';
import styled from 'styled-components';
import RecommendProduct from './RecommendProduct';
import PopularProduct from './PopularProduct';
import CategoryProduct from './CategoryProduct';
import ScrollToTopButton from '../../common/ScrollToTopButton';

import { QueryHandler, useProductsQuery } from '../../../hooks/useGetProduct';
import { Link } from 'react-router-dom';
import { categories } from './model/categories';
// import ChatRoomModal from '../community/modal/ChatRoomModal';

// import { useChatQuery } from '../../../hooks/useGetChatRoom';

const HomePage: React.FC = () => {
  const { data: products, isLoading, isError } = useProductsQuery();
  console.log(products);
  const availableProduct = products?.filter(
    (p) =>
      p.available === true &&
      new Date(p.deadline) > new Date() &&
      p.discountprice > 1
  );

  //할인율이 가장 높은 물건을 인기 상품으로
  const popularProduct = availableProduct?.sort(
    (a, b) =>
      (b.originalprice - b.discountprice) / b.originalprice -
      (a.originalprice - a.discountprice) / a.originalprice
  )[0];

  // 채팅방 테스트
  // const roomId = 5;
  // const {
  //   data: chats,
  //   isLoading: LoadingChat,
  //   isError: ErrorChat,
  // } = useChatQuery();
  // console.log(chats);
  // const [isModalOpenc, setModalOpenc] = useState(false);
  return (
    <>
      <QueryHandler isLoading={isLoading} isError={isError}>
        {/* <button onClick={() => setModalOpenc(true)}>채팅 작성하기</button>

        <QueryHandler isLoading={LoadingChat} isError={ErrorChat}>
          <ChatRoomModal
            chatRoomId={roomId}
            isOpen={isModalOpenc}
            onClose={() => setModalOpenc(false)}
            isAdminPage={true}
          />
        </QueryHandler> */}
        <ContainerBox>
          <Container>
            <StyledLink to={`/products/${popularProduct?.productPostId}`}>
              {' '}
              <PopularProduct
                productId={popularProduct?.productPostId}
                category={popularProduct?.category}
              />
            </StyledLink>
          </Container>
        </ContainerBox>
        <ContainerBox>
          <Container>
            <RecommendProduct products={availableProduct} />
          </Container>
        </ContainerBox>
        <ContainerBox>
          <Container>
            <CategoryProduct
              categories={categories}
              products={availableProduct}
            />
          </Container>
          <ScrollToTopButton />
        </ContainerBox>
      </QueryHandler>
    </>
  );
};
const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  &:link,
  &:visited,
  &:hover,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`;
const ContainerBox = styled.div`
  display: flex;
  margin-top: 5vh;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export default HomePage;
