import React, { useRef, forwardRef } from "react";
import styled from "@emotion/styled";
import Link from "next/link";
import { BsFillChatTextFill, BsFillHeartFill } from "react-icons/bs";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
// components
import Image from "next/image";

const Card = styled.div`
  width: 100%;
  margin: 0.6rem 0;
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  background: var(--aqua);
  border-radius: 5px;
  overflow: hidden;
  & img {
    cursor: pointer;
  }
  & a > span {
    height: 100% !important;
    width: 100% !important;
  }
  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    & img {
      width: 100% !important;
    }
  }
`;

const Container = styled.div`
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & h3,
  h4,
  h5 {
    padding: 0;
    margin: 0.2rem 0;
  }
  & h3 {
    font-size: 2.5rem;
    cursor: pointer;
  }
  & h4 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    font-style: italic;
    padding-right: 2rem;
  }
  & h5 {
    margin: 0.5rem 0 1rem 0;
    color: var(--green);
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }

  & svg {
    margin: 5px;
  }

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    h4 {
      padding-right: 0;
    }
  }
`;
const LikeBox = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--white);
  padding: 1rem 2rem;
  width: auto;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  svg {
    fill: var(--red2);
  }
  @media (max-width: 500px) {
    width: 100%;
    margin: 20px auto 0 auto;
    max-width: 200px;
    flex-direction: row;
    justify-content: center;
  }
`;
const CommentsBox = styled.span`
  display: flex;
  align-items: center;
  background: var(--white);
  padding: 0.5rem 1.2rem;
  width: auto;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  & svg {
    margin: 0 5px 0 0;
  }
`;
export default function ProductCard({
  id,
  name,
  description,
  imageUrl,
  votes,
  comments,
  createdAt,
}) {
  return (
    <Card>
      <Link href={`/products/${id}`}>
        <a>
          <Image
            src={imageUrl}
            alt={name}
            width={220}
            height={200}
            priority
            href={`/products/${id}`}
          />
        </a>
      </Link>
      <Container>
        <div>
          <Link href={`/products/${id}`} passHref>
            <h3>{name}</h3>
          </Link>

          {/* <span>{company}</span> */}
          <h4>&#34;{description}&#34;</h4>
          <Link href={`/products/${id}`} passHref>
            <CommentsBox>
              <BsFillChatTextFill />
              Comments: {comments.length}
            </CommentsBox>
          </Link>
          <h5>Created: {formatDistanceToNow(new Date(createdAt))}</h5>
        </div>
        <LikeBox>
          {votes}
          <BsFillHeartFill />
        </LikeBox>
      </Container>
    </Card>
  );
}
