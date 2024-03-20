import React from "react";
import PostCard from "../components/PostCard";

function Blogs() {
  return (
    <div className="flex flex-col ml-2 mr-2 bg-[rgb(240,240,240)] h-[750px] p-2 rounded-lg">
      <div className="font-bold text-3xl">
        <h1>Blogs</h1>
      </div>
      <div className="mt-2 mr-2">
        <PostCard
          title="Geyser Addons List"
          description="You need to have GeyserMC installed to use these addons!

          Read about it here
          
          How to install the addons
          There are 2 different types of Geyser addons.
          
          The first kind of Geyser Addon is installed by uploading it to your plugins folder. Some examples of plugin addons are Bedrock Player Managment and SimpleGeyserVL.
          
          The second kind of Geyser Addon is installed via the experimental Geyser Addon PR. An example of an experimental addon is GeyserReversion.
          
          The addon list!
          Bedrock Player Management
          Bedrock Player Management adds a way to give specific permissions to your bedrock players. This is most useful when using a anticheat that doesn't come with built in Geyser support.
          
          You can download it here
          
          SimpleGeyserVL
          SimpleGeyserVL is a plugin that allows bedrock players to use votifier voting! Floodgate Prefixes will no longer be a issue with this plugin installed!
          
          You can download it here
          
          GeyserReversion"
          time={new Date()}
        />
        <PostCard
          title="Geyser Addons List"
          description="You need to have GeyserMC installed to use these addons!

          Read about it here
          
          How to install the addons
          There are 2 different types of Geyser addons.
          
          The first kind of Geyser Addon is installed by uploading it to your plugins folder. Some examples of plugin addons are Bedrock Player Managment and SimpleGeyserVL.
          
          The second kind of Geyser Addon is installed via the experimental Geyser Addon PR. An example of an experimental addon is GeyserReversion.
          
          The addon list!
          Bedrock Player Management
          Bedrock Player Management adds a way to give specific permissions to your bedrock players. This is most useful when using a anticheat that doesn't come with built in Geyser support.
          
          You can download it here
          
          SimpleGeyserVL
          SimpleGeyserVL is a plugin that allows bedrock players to use votifier voting! Floodgate Prefixes will no longer be a issue with this plugin installed!
          
          You can download it here
          
          GeyserReversion"
          time={new Date()}
        />
      </div>
    </div>
  );
}

export default Blogs;
