import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-purple-500 py-16 px-8">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-4 text-6xl font-medium text-white">
            Welcome to the coolest anime social network!
          </h1>
          <p className="mb-4 text-xl text-white">
            Here at our site, you'll find a community of anime enthusiasts who
            are passionate about sharing their thoughts, recommendations and
            experiences on the latest and greatest anime shows.
          </p>
          <p className="mb-4 text-xl text-white">
            Whether you're a die-hard fan of classics like Naruto and One Piece
            or a newcomer to the world of anime, we've got you covered with
            exclusive content, reviews, and discussions.
          </p>
          <p className="mb-8 text-xl text-white">
            Our site also features a user-friendly profile system where you can
            connect with other fans, create your own anime watchlist, and even
            share your own reviews and recommendations.
          </p>
          <a
            href="/signup"
            className="rounded-lg bg-white py-3 px-6 text-xl text-pink-500 hover:bg-pink-500 hover:text-white"
          >
            Join the community
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
