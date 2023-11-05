import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./Candy-Crash.css";
import blank from "./assets/images/img-7.jpg";

import image_1 from "./assets/images/img-2.jpg";
import image_2 from "./assets/images/img-3.jpg";
import image_3 from "./assets/images/img-4.jpg";
import image_4 from "./assets/images/img-5.jpg";
import image_5 from "./assets/images/img-6.jpg";

const width = 8;
// const COLORS = ["red", "blue", "orange", "yellow", "purple", "green"];

const IMAGES = [image_1, image_2, image_3, image_4, image_5];

const COLORS = [...IMAGES];

function Candy_Crash() {

  const [colors, setColors] = useState([]);
  const [draggedId, setDraggedId] = useState(null);
  const [replacementId, setReplacementId] = useState(null);
  const [score, setScore] = useState(0);

  const updateColors = useMemo(() => {
    return [...colors];
  }, [colors]);

  const checkColumnOf3 = useCallback(() => {
    for (let i = 0; i <= 47; i++) {
      const checkItems = [i, i + width, i + width * 2];
      const checkItem = updateColors[i];
      if (checkItems.every((item) => updateColors[item] === checkItem)) {
        checkItems.forEach((item) => (updateColors[item] = blank));
        setScore(prev => prev + 3);
        return true;
      }
    }
    setColors(updateColors);
  }, [updateColors]);

  const checkColumnOf4 = useCallback(() => {
    for (let i = 0; i <= 39; i++) {
      const checkItems = [i, i + width, i + width * 2, i + width * 3];
      const checkItem = updateColors[i];
      if (checkItems.every((item) => updateColors[item] === checkItem)) {
        checkItems.forEach((item) => (updateColors[item] = blank));
        setScore((prev) => prev + 4);
        return true;
      }
    }

    setColors(updateColors);
  }, [updateColors]);

  const checkRownOf3 = useCallback(() => {
    const invalidIndexes = [
      6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64,
    ];
    for (let i = 0; i < 64; i++) {
      const checkItems = [i, i + 1, i + 2];
      const checkItem = updateColors[i];

      if (invalidIndexes.includes(i)) continue;

      if (checkItems.every((item) => updateColors[item] === checkItem)) {
        checkItems.forEach((item) => (updateColors[item] = blank));
        setScore((prev) => prev + 3);
        return true;
      }
    }
    setColors(updateColors);
  }, [updateColors]);

  const checkRownOf4 = useCallback(() => {
    const invalidIndexes = [
      5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53,
      54, 55, 62, 63, 64,
    ];
    for (let i = 0; i < 64; i++) {
      const checkItems = [i, i + 1, i + 2];
      const checkItem = updateColors[i];

      if (invalidIndexes.includes(i)) continue;

      if (checkItems.every((item) => updateColors[item] === checkItem)) {
        checkItems.forEach((item) => (updateColors[item] = blank));
        setScore((prev) => prev + 4);
        return true;
      }
    }
    setColors(updateColors);
  }, [updateColors]);

  const setColorCombination = useCallback(() => {
    const colorCombinations = [];
    for (let i = 0; i < width * width; i++) {
      const rand = Math.floor(Math.random() * COLORS.length);
      colorCombinations.push(COLORS[rand]);
    }

    setColors(colorCombinations);
  }, []);

  const fillEmpty = useCallback(() => {
    for (let i = 0; i < 64 - width; i++) {
      if (i < 8 && updateColors[i] === blank) {
        const rand = Math.floor(Math.random() * COLORS.length);
        updateColors[i] = COLORS[rand];
      }

      if (updateColors[i + width] === blank) {
        updateColors[i + width] = updateColors[i];
        updateColors[i] = blank;
      }
    }

    setColors(updateColors);
  }, [updateColors]);

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prev) => prev);
      checkColumnOf4();
      checkRownOf4();
      checkColumnOf3();
      checkRownOf3();

      fillEmpty();
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, [checkColumnOf3, checkColumnOf4, checkRownOf3, checkRownOf4, fillEmpty]);

  useEffect(() => {
    setColorCombination();
  }, [setColorCombination]);

  const dragStart = (event) => {
    setDraggedId(event);
  };

  const dragDrop = (event) => {
    setReplacementId(event);
  };

  const dragEnd = (isEnd) => {
    if (isEnd) {
      const dragId = parseInt(draggedId.dataset.id);
      const replaceId = parseInt(replacementId.dataset.id);

      const validMove = [
        dragId - 1,
        dragId + 1,
        dragId + width,
        dragId - width,
      ];

      updateColors[dragId] = replacementId.getAttribute('src');
      updateColors[replaceId] = draggedId.getAttribute("src");

      if (
        validMove.includes(replaceId) &&
        (checkColumnOf4() ||
          checkRownOf4() ||
          checkColumnOf3() ||
          checkRownOf3())
      ) {
        setColors(updateColors);
      } else {
        updateColors[dragId] = draggedId.getAttribute("src");
        updateColors[replaceId] = replacementId.getAttribute("src");
      }
    }
  };

  return (
    <div className="main-box">
      <div className="game-board">
        {colors.map((color, index) => {
          return (
            <Candy
              color={color}
              key={index}
              id={index}
              onDragEnd={dragEnd}
              onDragStart={dragStart}
              onDragDrop={dragDrop}
            />
          );
        })}

        <div className="score">
          <p className="result">
            {score}
          </p>
        </div>
      </div>
    </div>
  );
}

function Candy(props) {
  function handleDragStart(event) {
    props.onDragStart(event.target);
    console.log("start");
  }

  function handleDragEnd(event) {
    props.onDragEnd(true);
  }

  function handleDrop(event) {
    props.onDragDrop(event.target);
    console.log("drop");
  }

  return (
    <img
      src={props.color}
      alt={props.color}
      className="candy"
      data-id={props.id}
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
      onDragEnd={handleDragEnd}
      onDrop={handleDrop}
    ></img>
  );
}

export default Candy_Crash;
