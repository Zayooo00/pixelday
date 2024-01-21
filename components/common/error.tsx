import { FiAlertCircle } from "react-icons/fi";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => (
  <div className="flex items-center">
    <FiAlertCircle className="mr-2 text-red-500" />
    <p className="text-red-500">{message}</p>
  </div>
);

export default Error;
