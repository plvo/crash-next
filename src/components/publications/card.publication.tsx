"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PublicationWithAuthor } from "@/types/prisma";
import { User } from "next-auth";
import Link from "next/link";
import { publications, user } from "@prisma/client";

type PublicationData<T> = T extends PublicationWithAuthor ? T : publications;

export default function CardPublication<T>({
  userSession,
  data,
  authorData,
}: {
  userSession: User;
  data: PublicationData<T>;
  authorData?: T extends PublicationWithAuthor ? never : user;
}) {
  const { id, title, content, created_at } = data;
  
  const author = (data as PublicationWithAuthor).author ?? authorData;
  const { name, profile_img, id: id_author } = author;

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
    <Card className="w-full rounded-xl">
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={profile_img}
              alt={"@" + name}
              className=" object-cover"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">
                {name}
                {isAccountPost && (
                  <span className="text-xs text-foreground/50 ml-2">You</span>
                )}
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
      <CardFooter className="flex justify-between items-center px-4 py-3 border-t">
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
        <Link href={"/user/" + id_author}>
          <Button variant="outline" className="text-foreground">
            View profile
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
