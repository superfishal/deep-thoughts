import React from "react";
import Auth from "../utils/auth";
import ReactionForm from "../components/ReactionForm";
import ReactionList from "../components/ReactionList";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_THOUGHT } from "../utils/queries";
const SingleThought = (props) => {
  const { id: thoughtId } = useParams();

  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variables: { id: thoughtId },
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{" "}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>

      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions} />
      )}
      {Auth.loggedIn() && <ReactionForm thoughtId={thought._id} />}
    </div>
  );
};

export default SingleThought;
