function determineCoupureGeneric(params) {
  // Paramètres par défaut
  const defaultParams = { montant: 0, typeDevise: "EUR" };
  params = { ...defaultParams, ...params };
  const { montant, typeDevise } = params;

  // Vérification du montant
  if (montant <= 0 || typeof montant !== "number") {
    return "Veuillez entrer un montant positif.";
  }

  // Liste des coupures disponibles par devise
  const coupures = {
    EUR: [
      // Billets
      { valeur: 500, type: "billet" },
      { valeur: 200, type: "billet" },
      { valeur: 100, type: "billet" },
      { valeur: 50, type: "billet" },
      { valeur: 20, type: "billet" },
      { valeur: 10, type: "billet" },
      { valeur: 5, type: "billet" },
      // Pièces
      { valeur: 2, type: "pièce" },
      { valeur: 1, type: "pièce" },
      { valeur: 0.5, type: "pièce" },
      { valeur: 0.2, type: "pièce" },
      { valeur: 0.1, type: "pièce" },
      { valeur: 0.05, type: "pièce" },
      { valeur: 0.02, type: "pièce" },
      { valeur: 0.01, type: "pièce" },
    ],
    USD: [
      { valeur: 100, type: "billet" },
      { valeur: 50, type: "billet" },
      { valeur: 20, type: "billet" },
      { valeur: 10, type: "billet" },
      { valeur: 5, type: "billet" },
      { valeur: 2, type: "billet" },
      { valeur: 1, type: "billet" },
      { valeur: 0.5, type: "pièce" },
      { valeur: 0.25, type: "pièce" },
      { valeur: 0.1, type: "pièce" },
      { valeur: 0.05, type: "pièce" },
      { valeur: 0.01, type: "pièce" },
    ],
    YUAN: [
      { valeur: 100, type: "billet" },
      { valeur: 50, type: "billet" },
      { valeur: 20, type: "billet" },
      { valeur: 10, type: "billet" },
      { valeur: 5, type: "billet" },
      { valeur: 2, type: "billet" },
      { valeur: 1, type: "billet" },
      { valeur: 0.5, type: "pièce" },
      { valeur: 0.25, type: "pièce" },
      { valeur: 0.1, type: "pièce" },
      { valeur: 0.05, type: "pièce" },
      { valeur: 0.01, type: "pièce" },
    ],
  };

  // Vérification de la devise
  if (!coupures[typeDevise]) {
    return "Devise non supportée. Utilisez 'EUR', 'USD' ou 'YUAN'.";
  }

  // Calcul de la répartition
  const repartition = {};
  let montantRestant = montant;

  // Pour chaque coupure disponible
  for (const { valeur, type } of coupures[typeDevise]) {
    // Calcul du nombre de billets/pièces nécessaires
    const nombre = Math.floor(montantRestant / valeur);
    if (nombre > 0) {
      repartition[valeur] = { nombre, type };
      montantRestant = (montantRestant % valeur).toFixed(2);
    }
  }

  // Formatage du résultat
  let message = `Répartition pour ${montant} ${typeDevise} :\n\n`;

  // Affichage des billets
  message += "Billets :\n";
  let hasBillets = false;
  for (const [valeur, details] of Object.entries(repartition)) {
    if (details.type === "billet") {
      hasBillets = true;
      message += `${details.nombre} billet${
        details.nombre > 1 ? "s" : ""
      } de ${valeur} ${typeDevise}\n`;
    }
  }
  if (!hasBillets) message += "Aucun billet nécessaire\n";

  // Affichage des pièces
  message += "\nPièces :\n";
  let hasPieces = false;
  for (const [valeur, details] of Object.entries(repartition)) {
    if (details.type === "pièce") {
      hasPieces = true;
      if (valeur >= 1) {
        message += `${details.nombre} pièce${
          details.nombre > 1 ? "s" : ""
        } de ${valeur} ${typeDevise}\n`;
      } else {
        const centimes = valeur * 100;
        message += `${details.nombre} pièce${
          details.nombre > 1 ? "s" : ""
        } de ${centimes} centime${centimes > 1 ? "s" : ""}\n`;
      }
    }
  }
  if (!hasPieces) message += "Aucune pièce nécessaire\n";

  return message;
}

export default determineCoupureGeneric;
