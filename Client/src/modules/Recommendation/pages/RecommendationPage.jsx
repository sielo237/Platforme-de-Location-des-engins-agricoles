import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import { toast, ToastContainer } from "react-toastify";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ahpRequest } from "../services/AhpService";
import Container from "../../../components/baseComponents/Container";

const preferences = [
  {
    name: "Egale importance",
    value: 1,
  },
  {
    name: "Moyennement important",
    value: 3,
  },
  {
    name: "Très important",
    value: 5,
  },
  {
    name: "Très fortement important",
    value: 7,
  },
  {
    name: "Extrèmement important",
    value: 9,
  },
];

const RecommendationPage = () => {
  const [step, setStep] = useState(1);
  const [actual, setActual] = useState({ current: 0, target: 1 });
  const [ahp, setAhp] = useState({
    criteria: ["Prix", "Note obtenu", "Nombre de location"],
    comparisons: [
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
    ],
  });

  const [selectedRenter, setSelectedRenter] = useState("");

  const handleChange = (e) => {
    var newComparison = ahp.comparisons;
    newComparison[actual.current][actual.target] = parseInt(e.target.value);
    setAhp({ ...ahp, comparisons: newComparison });
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      setActual({ current: 0, target: 2 });
    } else if (step === 2) {
      setStep(3);
      setActual({ current: 1, target: 2 });
    } else {
      generateAhp();
    }
  };

  const generateAhp = async () => {
    setSelectedRenter("");
    try {
      const newArray = completeArray();
      const res = await ahpRequest({ comparisons: newArray });
      if (res.status === 200) {
        setSelectedRenter(res.data[0].name);
      }
    } catch (error) {
      toast.error("Vos choix ne sont pas consistants")
    }
  };

  const handlePrev = () => {
    if (step === 2) {
      setStep(1);
      setActual({ current: 0, target: 1 });
    } else if (step === 3) {
      setStep(2);
      setActual({ current: 0, target: 2 });
    }
  };

  const completeArray = () => {
    var newComparison = ahp.comparisons;
    newComparison[1][0] = 1 / newComparison[0][1];
    newComparison[2][0] = 1 / newComparison[0][2];
    newComparison[2][1] = 1 / newComparison[1][2];
    return newComparison;
  };

  return (
    <section className="bg-[#F8F8F8] min-h-screen">
      <Container>
        <p className="text-center text-2xl text-primary mt-4 font-uppercase font-bold uppercase">
          Recommendation
        </p>
        <p className="font-light text-uppercase text-center text-md">
          Voulez-vous qu'on vous recommende un loueur? remplissez les questions
          suivantes{" "}
        </p>

        <div className="grid grid-cols-5 gap-8 mt-4">
          <div className=" bg-white rounded-md col-span-3 p-2">
            <p className="text-center font-medium text-md">
              Que preferez-vous parmi ?
            </p>
            <p className="text-center font-bold mt-4 ">
              <span>{ahp.criteria[actual.current]}</span> et{" "}
              <span>{ahp.criteria[actual.target]}</span>
            </p>
            <div className="flex justify-center ">
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={ahp.comparisons[actual.current][actual.target]}
                  onChange={handleChange}
                >
                  {preferences.map((pref, id) => {
                    return (
                      <FormControlLabel
                        key={id}
                        value={pref.value}
                        control={<Radio />}
                        label={pref.name}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex justify-center items-center mt-4 ">
              <button
                className={` ${
                  step === 1 && "hidden"
                } mx-2 rounded-md text-secondary border border-secondary py-1.5 px-4 bg-white`}
                onClick={() => handlePrev()}
              >
                Précedent
              </button>
              <button
                className="mx-2 rounded-md border border-secondary py-1.5 px-4 bg-secondary text-white"
                onClick={() => handleNext()}
              >
                {step < 3 ? "Suivant" : "Recommender"}
              </button>
            </div>
          </div>
          <div className="col-span-2 bg-white rounded-md shadow shadow-md p-2 h-fit">
            <p className="text-center font-medium ">Notre valuation</p>
            <div className="mt-4 px-4 text-lg font-light">
              {preferences.map((pref, id) => {
                return (
                  <p key={id}>
                    {pref.value} - {pref.name}
                  </p>
                );
              })}
            </div>
          </div>
          
        </div>
       {
        selectedRenter && (
            <p className="text-center mt-8 text-lg">Le loueur suggéré est <span className="font-bold">{selectedRenter}</span></p>
        )
       }
      </Container>
      <ToastContainer />
    </section>
  );
};

export default RecommendationPage;
