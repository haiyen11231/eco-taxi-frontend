import dayjs from "dayjs";
// import { google } from "google-protobuf"; // Protobuf typings
import { Timestamp } from "google-protobuf/google/protobuf/timestamp_pb";

// const { Timestamp } = google.protobuf;

// Converts seconds from *timestamppb.Timestamp to "MM-YY" format
export const convertToFormat = (seconds: number): string => {
  return dayjs.unix(seconds).format("MM-YY");
};

// Converts "MM-YY" format to *timestamppb.Timestamp object
export const convertToTimestamp = (format: string): Timestamp => {
  const date = dayjs(format, "MM-YY"); // Parse the "MM-YY" string format
  const seconds = date.endOf("month").unix(); // Convert to Unix timestamp (end of month)

  // Create a new Timestamp object
  const timestamp = new Timestamp();
  timestamp.setSeconds(seconds);
  timestamp.setNanos(0); // Nanoseconds set to 0

  return timestamp;
};
