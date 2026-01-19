import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../ui/Button";
import { Check, X, Loader2 } from "lucide-react";

export function UsernameForm({ currentUsername, userId, onSuccess }) {
  const [username, setUsername] = useState(currentUsername || "");
  const [savedUsername, setSavedUsername] = useState(currentUsername || "");
  const [isEditing, setIsEditing] = useState(!currentUsername);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sync with prop changes
  useEffect(() => {
    if (currentUsername) {
      setSavedUsername(currentUsername);
      setUsername(currentUsername);
      setIsEditing(false);
    }
  }, [currentUsername]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    const trimmed = username.trim().toLowerCase();
    if (trimmed.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }
    if (!/^[a-z0-9_]+$/.test(trimmed)) {
      setError("Only lowercase letters, numbers, and underscores allowed");
      return;
    }

    setIsLoading(true);

    try {
      // Check if username is taken
      const { data: existing } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", trimmed)
        .neq("id", userId)
        .single();

      if (existing) {
        setError("Username already taken");
        setIsLoading(false);
        return;
      }

      // Update username
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ username: trimmed })
        .eq("id", userId);

      if (updateError) {
        setError(updateError.message);
      } else {
        // Update local state immediately
        setSavedUsername(trimmed);
        setIsEditing(false);
        if (onSuccess) onSuccess(trimmed);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing && savedUsername) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">@{savedUsername}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">@</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          placeholder="your_username"
          className="h-8 w-40 rounded-md border border-input bg-background px-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          disabled={isLoading}
          autoFocus
        />
        <Button
          type="submit"
          size="sm"
          disabled={isLoading}
          className="h-8 w-8 p-0"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
        </Button>
        {savedUsername && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsEditing(false);
              setUsername(savedUsername);
              setError(null);
            }}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  );
}
