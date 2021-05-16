import { useSpring, animated } from "react-spring";

export default function Quotes(props) {
  const { opacity } = useSpring({
    opacity: props.isLoading ? 0 : 1,
  });

  return (
    <animated.div className="text" style={{ opacity: opacity }}>
      "{props.text.quoteText}"
    </animated.div>
  );
}
