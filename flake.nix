{
  description = "Clock - a simple, customizable web clock";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
  };

  outputs = { self, nixpkgs }:
    let
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in
        {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              # Local development server
              python3

              # JSON processing
              jq

              # HTTP requests
              curl

              # Git operations
              git
              gh

              # Node.js (for npm packages if needed)
              nodejs
            ];

            shellHook = ''
              echo "Clock dev environment"
              echo "Run 'python3 -m http.server 8000' to start local server"
            '';
          };
        });
    };
}
