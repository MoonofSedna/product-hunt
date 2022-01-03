/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import ClipLoader from "react-spinners/ClipLoader";
import { FirebaseContext } from "../../firebase";
import Image from "next/image";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import styled from "@emotion/styled";
import Form from "../../components/ui/form";
import Buttons from "../../components/ui/buttons";
import {
  BsFillChatTextFill,
  BsFillHeartFill,
  BsFillTrashFill,
} from "react-icons/bs";

const ProductContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 3rem 3rem 3rem;
  width: 100%;
  max-width: 1100px;
  @media (max-width: 400px) {
    padding: 20px;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-template-rows: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 0px;
  & h2 {
    color: var(--purple);
    font-size: 2.8rem;
    padding: 1rem 0;
  }

  & h3,
  h4,
  h5 {
    padding: 0;
    margin: 1rem 0 0 0;
  }
  & h3 {
    padding: 2rem 0 0 0;
    display: flex;
    align-items: center;
  }
  & h3,
  h5 {
    font-size: 1.8rem;
  }
  & h5 {
    font-style: italic;
  }
  & .created {
    color: var(--green);
    font-size: 1.4rem;
  }
  & .created:first-letter {
    text-transform: uppercase;
  }
  & .div1 {
    & img {
      border-radius: 5px;
    }

    & .image-container {
      width: 90%;
      max-width: 300px;
    }

    & > div {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 1rem 0;
      & button {
        display: flex;
        align-items: center;
        padding: 1rem;
        margin-right: 0.7rem;
        & a {
          color: var(--white);
        }
      }
      & svg {
        font-size: 15px;
      }
    }
  }

  & svg {
    margin-left: 5px;
  }
  & .div2 {
    margin-top: 6rem;
  }

  .comments-form {
    padding: 1rem;
    width: 100%;
    background: var(--green);
    & label {
      padding: 0.5rem 1rem;
    }
  }
  & hr {
    border-width: 1px;
    border-color: var(--purple);
  }
  .has-voted {
    cursor: default;
  }
  .has-voted:hover {
    background: var(--green);
    color: var(--white);
    border: 2px solid var(--green);
  }
  .has-voted svg {
    color: var(--red2);
  }

  .delete-product {
    background: var(--red2);
    color: var(--white);
    border: 2px solid var(--red2);
    margin: 1rem 0;
    &:hover {
      background: var(--purple);
      border: 2px solid var(--purple);
    }
    svg {
      position: relative;
      top: 2px;
    }
  }
`;

const Comments = styled.div`
  display: flex;
  flex-direction: column;
  background: var(--aqua);
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  margin: 1rem 0;
  & span {
    font-style: italic;
  }
  & h6 {
    color: var(--purple);
    font-size: 1.4rem;
    margin: 0;
  }
`;

export default function Product() {
  const [product, setProduct] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState({});

  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

  async function fetchProduct() {
    try {
      const productQuery = await firebase.getDoc(id);
      const data = await productQuery.data();
      if (data) {
        setProduct(data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    id && fetchProduct();
  }, [id]);

  const voteForProduct = async () => {
    if (!user) {
      return router.push("/login");
    }

    if (product.hasVoted.includes(user.uid)) {
      return;
    }

    try {
      const newTotal = product.votes + 1;

      setProduct({ ...product, votes: newTotal });

      const votesList = [...product.hasVoted, user.uid];

      firebase.updateDoc(id, { votes: newTotal, hasVoted: votesList });
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const commentOnChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const addComment = async (e) => {
    e.preventDefault();
    e.target.reset();
    if (!user) {
      return router.push("/login");
    }
    const newComment = {
      ...comment,
      user: user.displayName,
      userId: user.uid,
      created: Date.now(),
    };

    const comments = [newComment, ...product.comments];

    const savedProduct = { ...product, comments: comments };

    try {
      await firebase.updateDoc(id, savedProduct);
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async () => {
    if (!user) {
      return router.push("/login");
    }
    if (product.creator.id !== user.uid) {
      return router.push("/login");
    }
    try {
      await firebase.deleteDoc(id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContainer>
      {!error && product && !loading && (
        <Container>
          <div className="div1">
            <h2>{product.name}</h2>
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={0}
              height={0}
              sizes="(max-width: 500px) 100px, 180px"
            />

            <div>
              <Buttons>
                <a href={product.url} target="_blank" rel="noreferrer">
                  Go to site
                </a>
              </Buttons>

              {user ? (
                <>
                  <Buttons
                    className={
                      product.hasVoted.includes(user.uid) && "has-voted"
                    }
                    onClick={voteForProduct}
                  >
                    Vote <BsFillHeartFill />
                  </Buttons>

                  <span>{product.votes}</span>
                </>
              ) : (
                <span>Votes: {product.votes}</span>
              )}
            </div>

            <h4 className="creator">
              By {product.creator.name} from {product.company}
            </h4>
            <h5>&#34;{product.description}&#34;</h5>
            <h4 className="created">
              {formatDistanceToNow(new Date(product.createdAt))} ago.
            </h4>
            {product?.creator.id === user?.uid && (
              <Buttons className="delete-product" onClick={deleteProduct}>
                Delete product
                <BsFillTrashFill />
              </Buttons>
            )}
          </div>
          <div className="div2">
            {user && (
              <Form className="comments-form" onSubmit={addComment}>
                <label htmlFor="message">Add a comment</label>
                <div>
                  <textarea
                    placeholder="Put a comment..."
                    name="message"
                    id="message"
                    onChange={commentOnChange}
                  />
                </div>
                <div>
                  <input
                    type="submit"
                    value="Add comment"
                    className="comment-btn"
                  />
                </div>
              </Form>
            )}
            <h3>
              Comments <BsFillChatTextFill />
            </h3>
            <hr />
            {product.comments.length > 0 ? (
              product.comments.map((comment) => (
                <Comments key={comment.created} comment={comment}>
                  <span>&#34;{comment.message}&#34;</span>
                  <h6>
                    By{" "}
                    {comment.userId === product.creator.id
                      ? "the creator"
                      : comment.user}{" "}
                    at {formatDistanceToNow(new Date(comment.created))} ago.
                  </h6>
                </Comments>
              ))
            ) : (
              <h4>No comments yet...</h4>
            )}
          </div>
        </Container>
      )}

      {error && !loading && <p>Product not found</p>}

      {loading && <ClipLoader color="#696cba" size={60} />}
    </ProductContainer>
  );
}
