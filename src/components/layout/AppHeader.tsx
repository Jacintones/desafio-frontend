"use client";

import { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function AppHeader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Cooperativa db
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
