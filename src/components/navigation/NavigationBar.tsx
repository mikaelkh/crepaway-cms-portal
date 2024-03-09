"use client";
import React, { useState } from "react";
import Logo from "../svg/Logo";
import Container from "../Container";
import navigationData from "../../data/navigation.json";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {};

const NavigationBar = (props: Props) => {
  const pathName = usePathname();
  return (
    <div className="h-[var(--navbar-h)] backdrop-blur-lg border-b border-b-secondary w-full justify-start items-start">
      <Container>
        <div className="flex gap-12 items-center h-full">
          <div className="min-w-[50px] w-[50px] relative py-1">
            <Logo />
          </div>
          <div className="flex h-[var(--navbar-h)] gap-10 overflow-x-auto">
            {navigationData.map((item, idx) => (
              <Link
                href={item.link}
                key={idx}
                className={cn(
                  "relative text-secondary-foreground/80 hover:text-foreground rounded-full py-1.5 flex items-center justify-center before:w-0 before:duration-150 before:contents-[''] before:h-1 before:bg-primary before:bottom-0 before:absolute",
                  {
                    "before:w-full font-medium text-foreground":
                      item.link === pathName,
                  }
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default NavigationBar;
