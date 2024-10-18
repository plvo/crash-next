"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PublicationWithAuthor } from "@/types/prisma";
import { User } from "next-auth";

export default function CardPublication({
  userSession,
  data,
}: {
  userSession: User;
  data: PublicationWithAuthor;
}) {
  const { id, title, content, created_at, author } = data;
  const { name } = author;

  const isAccountPost = userSession.id === id;

  const [likes, setLikes] = useState(Math.floor(Math.random() * 100));
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  return (
    <Card className="w-full max-w-lg rounded-xl">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="@johndoe"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{name}
                {isAccountPost && <span className="text-xs text-foreground/50 ml-2">You</span>}
              </h3>
              <p className="text-sm text-foreground/50">
                {created_at.toUTCString()}
              </p>
            </div>
            <h4>{title}</h4>
            <p className="text-sm text-left">{content}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t">
        <Button
          variant="ghost"
          size="sm"
          className="text-foreground/40 hover:text-red-600 transition-colors"
          onClick={handleLike}
        >
          <Heart
            className={`w-5 h-5 mr-1 ${
              isLiked ? "fill-red-600 text-red-600" : "fill-none"
            }`}
          />
          <span className="text-sm font-medium">{likes}</span>
          <span className="sr-only">likes</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
